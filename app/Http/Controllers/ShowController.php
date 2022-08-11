<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Show;

class ShowController extends Controller
{
    public function index () {
      return Inertia::render('Shows/Shows', [
        'shows' => Show::all(),
      ]);
    }

    public function create (Request $request) {
      $trashedVenue = Show::where('name', $request->name)->withTrashed()->first();
      if ($trashedVenue) {
        $trashedVenue->restore();
        return redirect()->route('shows.view', [], 303);
      }

      $request->validate([
        'name' => ['required', 'string', 'unique:shows']
      ]);


      Show::create(['name' => $request->name]);

      return redirect()->route('shows.view', [], 303);
    }

    public function delete (Request $request, $id) {
      Show::destroy($id);
      return redirect()->route('shows.view', [], 303);
    }

    public function update (Request $request, $id) {
      $request->validate([
        'name' => ['required', 'string', 'unique:shows']
      ]);

      Show::findOrFail($id)->update([
        'name' => $request->name,
      ]);
      
      return redirect()->route('shows.view', [], 303);
    }
}
