<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\PasswordReset;
use App\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
//use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Password;
use Mail;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class Controller extends BaseController {
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function login(LoginRequest $request, JWTAuth $JWTAuth) {
		$credentials = $request->only(['email', 'password']);

		//$role=$request->only('role');

		try {

			if (empty($credentials['email'])) {

				throw new \Exception("Please enter email.", 400);
			}
			if (empty($credentials['password'])) {

				throw new \Exception("Please enter password.", 400);
			}

			//print_r($JWTAuth->attempt($credentials));

			$token = $JWTAuth->attempt($credentials);

			if (!$token) {
				throw new AccessDeniedHttpException("Invalid email or password.");
			}

			$user = User::query();
			$user = $user->where(['email' => $credentials['email']])->first();

			if (!empty($user)) {
				$user->save();
				return response()
					->json([
						'status' => '200',
						'token' => $token,
						'user' => $user,
					]);
			} else {

				return response()->json([

					'status' => '400',
					'error' => 'Your Status is Inactive Please Contect to our Help center.',

				], 400);

			}

		} catch (JWTException $e) {
			return response()->json([
				'status' => '400',
				'errors' => $e->getMessage(),
			], 400);

		} catch (AccessDeniedHttpException $e) {
			return response()->json([
				'status' => '301',
				'errors' => $e->getMessage(),
			], 301);
		}
	}

	public function sendResetEmail(Request $request) {

		try {
			if (empty($request->get('email'))) {
				throw new \Exception("Please enter email.", 400);
			}
			$link = $_SERVER['HTTP_HOST'];

			$user = User::where('email', '=', $request->get('email'))->first();
			if (!$user) {
				throw new NotFoundHttpException();
			}
			$token = $this->generate_random_password();

			$add = array('email' => $request->get('email'), 'token' => $token);
			$password_reset = PasswordReset::create($add);

			if (stripos($link, "localhost") !== false) {

				$link = env('reset-password-local') . $request->get('email') . '/' . $token;
			} else {

				$link = env('reset-password-live') . $request->get('email') . '/' . $token;
			}

			$to = $user->email;
			$subject = 'Forgot Password';
			$template_id = '
            <html>
                <head>
                    <title>Forgot Password</title>
                </head>
                <body>
                    <p>Dear ' . $user->name . ',</p>
                    <p>Please Click On link : ' . $link . '</p>

                    <p>Regards,<br/> Hungry Harvest </p>
                </body>
            </html>
            ';

			$this->send_mail($to, $template_id, [], '', '', $subject);
			return response()->json([
				'status' => '200',
				'message' => 'Password reset link has been successfully sent on your email id.',
			], 200);

		} catch (NotFoundHttpException $e) {
			return response()
				->json([
					'status' => '500',
					'errors' => "Email id not found.",
				], 301);
		} catch (HttpException $e) {
			return response()
				->json([
					'status' => '500',
					'errors' => $e->getMessage(),
				], 301);
		}
	}

	public function generate_random_password() {
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		$password = substr(str_shuffle($chars), 0, 12);
		return $password;
	}

	public function send_mail($to, $mail_template_id, $data = array(), $from = "anypol789@gmail.com", $debug = false, $subject) {

		if (is_array($from)) {
			$from_email = 'anypol789@gmail.com';
			$from_name = 'Hungry Harvest';
		} else {
			if (strpos($from, '@') !== false) {
				$from_email = 'anypol789@gmail.com';
				$from_name = 'Hungry Harvest';
			} else {
				$from_email = 'anypol789@gmail.com';
				$from_name = 'Hungry Harvest';
			}
		}

		$subject = $subject;
		$message = $mail_template_id;

		if (empty($to)) {
			$to = "anypol789@gmail.com";
		} else {
			$to = $to;
		}

		Mail::send('emails.default', ['message_data' => $message], function ($mail) use ($to, $from_email, $from_name, $subject) {
			$mail->from($from_email, $from_name);
			$mail->to($to)->subject($subject);
		});

		return true;

	}

	public function resetPassword(Request $request) {

		try {
			$request = $request->all();
			$val = PasswordReset::where('email', $request['email'])->where('token', $request['token'])->get()->first();

			if (!$val) {
				throw new NotFoundHttpException();
			}

			$user = User::where('email', $request['email'])->get()->first();

			$user = User::find($user->id);

			$user->password = bcrypt($request['password']);

			$user->save();
			$delete = PasswordReset::where('email', $val['email'])->delete();
			return response()->json([
				'status' => '200',
				'message' => 'Password has been changed successfully!!!.',
			], 200);

		} catch (HttpException $e) {
			return response()
				->json([
					'status' => '500',
					'errors' => $e->getMessage(),
				], 301);
		}

	}

}
