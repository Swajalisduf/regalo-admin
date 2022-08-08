<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Venue;

class VenueController extends Controller
{
    public function index () {
      return Inertia::render('Venues/index', [
        'venues' => Venue::all(),
      ]);
    }

    public function create (Request $request) {
      $trashedVenue = Venue::where('name', $request->name)->withTrashed()->first();
      if ($trashedVenue) {
        $trashedVenue->restore();
        return redirect()->route('venues.view', [], 303);
      }

      $request->validate([
        'name' => ['required', 'string', 'unique:venues']
      ]);


      Venue::create(['name' => $request->name]);

      return redirect()->route('venues.view', [], 303);
    }

    public function delete (Request $request, $id) {
      Venue::destroy($id);
      return redirect()->route('venues.view', [], 303);
    }

    public function update (Request $request, $id) {
      $request->validate([
        'name' => ['required', 'string', 'unique:venues']
      ]);

      Venue::findOrFail($id)->update([
        'name' => $request->name,
      ]);
      
      return redirect()->route('venues.view', [], 303);
    }
}
