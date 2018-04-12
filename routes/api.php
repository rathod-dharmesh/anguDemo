<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function() {
     
      Route::post('login', 		'Controller@login');
      Route::post('recovery',	'Controller@sendResetEmail');
      Route::post('reset',      'Controller@resetPassword');

});


Route::post('add-vendors','DashbordController@addVendors');
Route::post('dashboard','DashbordController@getDashboard');
Route::get('get-vendors','DashbordController@getVendors');
Route::post('get-vendors-product/{product}','DashbordController@getVendorsProduct');
Route::get('get-users','DashbordController@getUsers');
Route::post('add-users','DashbordController@addUsers');
Route::post('update-users','DashbordController@updateUsers');
Route::post('update-vendor','DashbordController@updateVendor');
Route::post('update-vendor-profile','DashbordController@updateVendorProfile');
Route::get('get-user-detail/{id}','DashbordController@getUserDeails');
Route::get('delete-user/{id}','DashbordController@deleteUser');
Route::get('delete-vendor/{id}','DashbordController@deleteVendor');
Route::post('delete-all-vendors','DashbordController@deleteAllVendors');
Route::post('delete-all-users','DashbordController@deleteAllUsers');
Route::get('get-vendor-detail/{id}','DashbordController@getVendorDeails');
Route::get('get-products','ProductController@getProducts');
Route::post('add-product','ProductController@addProduct');
Route::get('get-product-detail/{id}','ProductController@getProductDeails');
Route::post('update-product','ProductController@updateProduct');
Route::post('upload-product','ProductController@uploadProduct');
Route::get('delete-product/{id}','ProductController@deleteProduct');
Route::post('delete-all-products','ProductController@deleteAllProduct');
Route::get('downloadExcel/{type}','ProductController@downloadExcel');