<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
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

    // Product routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);

    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::put('/products/{id}', [ProductController::class, 'update']);

    // Used for authentication on the frontend
    Route::get('/profile', [ProfileController::class, 'get']);

    // Product types routes
    Route::get('/product_type', [ProductTypeController::class, 'index']);
    Route::post('/product_type', [ProductTypeController::class, 'store']);

    Route::get('/product_type/{id}', [ProductTypeController::class, 'show']);
    Route::delete('/product_type/{id}', [ProductTypeController::class, 'destroy']);
    Route::put('/product_type/{id}', [ProductTypeController::class, 'update']);
});

// Authentication
Auth::routes();
