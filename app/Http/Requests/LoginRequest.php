<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules()
    {
        
        return Config::get('site.login.validation_rules');
    }

    public function messages()
    {
        $messages = Config::get('site.login.validation_messages');
        if(!empty($messages))
            return $messages;
        else
            return [];
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
}
