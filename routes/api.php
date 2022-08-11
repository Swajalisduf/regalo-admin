<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\TheaterCompanyController;
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
  Route::controller(ShowController::class)->prefix('shows')->group(function () {
    Route::post('/', 'create')->name('shows.create');
    Route::put('/{id}', 'update')->name('shows.update');
    Route::delete('/{id}', 'delete')->name('shows.delete');
  });
  Route::controller(TheaterCompanyController::class)->prefix('theater_companies')->group(function () {
    Route::post('/', 'create')->name('theater_companies.create');
    Route::put('/{id}', 'update')->name('theater_companies.update');
    Route::delete('/{id}', 'delete')->name('theater_companies.delete');
  });
  Route::controller(VenueController::class)->prefix('venues')->group(function () {
    Route::post('/', 'create')->name('venues.create');
    Route::put('/{id}', 'update')->name('venues.update');
    Route::delete('/{id}', 'delete')->name('venues.delete');
  });
});
