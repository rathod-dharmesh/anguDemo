<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\CrudTrait;

class PasswordReset extends Model
{
    //use CrudTrait;

     /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'password_resets';
    
    protected $fillable = ['email','token'];
    public $timestamps = false;
    
}
