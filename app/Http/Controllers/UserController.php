<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index () {
      return UserResource::collection(User::get());
    }

    public function show ($id) {
      return new UserResource(User::where('id', $id)->first());
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
