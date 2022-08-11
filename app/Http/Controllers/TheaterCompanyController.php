<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TheaterCompany;

class TheaterCompanyController extends Controller
{
    public function index () {
      return Inertia::render('TheaterCompanies/TheaterCompanies', [
        'theaterCompanies' => TheaterCompany::all(),
      ]);
    }

    public function create (Request $request) {
      $trashedVenue = TheaterCompany::where('name', $request->name)->withTrashed()->first();
      if ($trashedVenue) {
        $trashedVenue->restore();
        return redirect()->route('theater_companies.view', [], 303);
      }

      $request->validate([
        'name' => ['required', 'string', 'unique:theater_companies']
      ]);


      TheaterCompany::create(['name' => $request->name]);

      return redirect()->route('theater_companies.view', [], 303);
    }

    public function delete (Request $request, $id) {
      TheaterCompany::destroy($id);
      return redirect()->route('theater_companies.view', [], 303);
    }

    public function update (Request $request, $id) {
      $request->validate([
        'name' => ['required', 'string', 'unique:theater_companies']
      ]);

      TheaterCompany::findOrFail($id)->update([
        'name' => $request->name,
      ]);
      
      return redirect()->route('theater_companies.view', [], 303);
    }
}
