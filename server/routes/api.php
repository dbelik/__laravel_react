<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth'], function () {
    // Product types routes
    Route::get('/product_type', [ProductTypeController::class, 'get']);
    Route::post('/product_type', [ProductTypeController::class, 'post']);

    // Product routes
    Route::get('/products', [ProductsController::class, 'get']);
    Route::post('/products', [ProductsController::class, 'post']);
});

// Used for authentication on the frontend
Route::get('/profile', [ProfileController::class, 'get']);

// Authentication
Auth::routes();
