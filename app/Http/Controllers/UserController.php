<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index () {
      return User::get();
    }

    public function show ($id) {
      return User::where('id', $id)->first();
    }

    public function create(Request $request) {
      User::updateOrCreate([
        'email' => $request->email
      ], [
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password,
      ]);

      return redirect()->route('users.view', 303);
    }

    public function update(Request $request, $id) {
      User::where('id', $id)->update[$request->all()];
      return redirect()->route('users.view', 303);
    }
}
