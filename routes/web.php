<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Measurement;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard.view');
  Route::prefix('/users')->group(function () {
    Route::get('/', function () {
      return Inertia::render('Users/index', ['users' => User::get()]);
    })->name('users.view');
    Route::get('/create', function (Request $request) {
      return Inertia::render('Users/CreateUser');
    })->name('users.create.view');
    Route::get('/{id}/measurements', function ($id) {
      return Inertia::render('Users/Measurements', [
        'user' => User::where('id', $id)->first(),
        'userMeasurements' => Measurement::where('user_id', $id)->first(),
      ]);
    })->name('users.measurements.view');
  });
});

require __DIR__.'/auth.php';
