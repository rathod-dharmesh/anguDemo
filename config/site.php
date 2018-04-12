<?php
return [
    'sign_up' => [
        'release_token' => env('SIGN_UP_RELEASE_TOKEN', false),
        'email_verify' => env('SIGN_UP_EMAIL_VERIFY', true),
        'validation_rules' => [
             'first_name'=>'required',
             'last_name'=>'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'confirm_password' =>'required|same:password'
           
           /* 'military_email' => 'required|email|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+\.)*(mil)+$/|unique:users,military_email',*/
        ],
        'validation_messages' => [
        ],
        'signup_fields' => [
            'firstname',
            'lastname',
            'birthdate',
            'email',
            'password'
            
        ]
    ],


    'change_password' => [
        'validation_rules' => [
            'current_password' => 'required',
            'password' => 'required',
            'confirm_password' =>'required|same:password'
        ]
    ],

    'login' => [
        'validation_rules' => [
            'email' => 'required|email',
            'password' => 'required'
        ]
    ],

    'forgot_password' => [
        'validation_rules' => [
            'email' => 'required|email'
        ],
        'reset_ulr' => env('RESET_PASSWORD_URL', '/#/reset-password/')
    ],

    'reset_password' => [
        'release_token' => env('PASSWORD_RESET_RELEASE_TOKEN', false),
        'validation_rules' => [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ],

    ],

    'contact_us' => [
        'validation_rules' => [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required'
        ],
    ],

    'user' => [
        'validation_rules' => [
            'email' => 'required',
            'first_name' => 'sometimes|required',
            'last_name' => 'sometimes|required'
        ],
        'validation_messages' => [
        ],
        'user_fields' => [
            'first_name',
            'last_name',
            'email'
        ]
    ]
];