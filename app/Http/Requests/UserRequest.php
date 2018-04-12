<?php

namespace App\Api\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserRequest extends FormRequest
{
    public function rules()
    {
        $rules = Config::get('site.user.validation_rules');
        return $rules;
    }

    public function response(array $errors) {
        // Put whatever response you want here.
        return response([
            'status' => '422',
            'errors' => $errors,
        ], 422);
    }

    public function authorize()
    {
        return true;
    }
    
    public function messages()
    {
        $messages = Config::get('site.user.validation_messages');
        if(!empty($messages))
            return $messages;
        else
            return [];
    }
}
