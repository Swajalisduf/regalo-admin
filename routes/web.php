<?php

use App\Http\Controllers\ShowController;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VenueController;
use App\Models\User;

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
  Route::get('/', function () {
    return redirect()->route('dashboard.view');
  })->name('dashboard.view');
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard.view');

  Route::prefix('/users')->group(function () {
    Route::get('/', function () {
      return Inertia::render('Users/index', ['users' => User::get()]);
    })->name('users.view');
    Route::get('/create', function () {
      return Inertia::render('Users/CreateUser');
    })->name('users.create.view');
    Route::get('/{id}/measurements', function ($id) {
      $user = new UserResource(User::findOrFail($id)->load('measurements'));

      return Inertia::render('Users/Measurements', [
        'user' => collect($user)->only('id', 'measurements', 'name'),
      ]);
    })->name('users.measurements.view');
  });

  Route::controller(VenueController::class)->group(function () {
    Route::get('/venues', 'index')->name('venues.view');
  });

  Route::controller(ShowController::class)->group(function () {
    Route::get('/shows', 'index')->name('shows.view');
  });
});

require __DIR__.'/auth.php';
