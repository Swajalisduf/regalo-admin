<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\VenueController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth.session')->group(function () {
  Route::controller(UserController::class)->prefix('users')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'create')->name('users.create');
    Route::put('/', 'update');
    Route::prefix('/{id}/measurements')->group(function () {
      Route::get('/', [MeasurementController::class, 'show'])->name('users.measurements');
      Route::post('/', [MeasurementController::class, 'create'])->name('users.measurements.create');
      Route::put('/', [MeasurementController::class, 'update'])->name('users.measurements.update');
    });
  });
  Route::controller(VenueController::class)->prefix('venues')->group(function () {
    Route::post('/', 'create')->name('venues.create');
    Route::put('/{id}', 'update')->name('venues.update');
    Route::delete('/{id}', 'delete')->name('venues.delete');
  });
});
