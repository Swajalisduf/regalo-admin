<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Measurement;
use App\Models\User;

class MeasurementController extends Controller
{
    public function show($id) {
      return Measurement::where('id', $id)->first();
    }

    public function create($id) {
      $newMeasurement = Measurement::create([
        'user_id' => $id,
      ]);

      return redirect()->route('users.measurements.view', [
        'id' => $id,
        'user' => User::where('id', $id),
        'userMeasurements' => $newMeasurement,
      ], 303);
    }

    public function update(Request $request, $id) {
      $measurements = Measurement::updateOrCreate(
        ['user_id' => $id],
        [
          'user_id' => $id,
          'height' => $request->height,
          'weight' => $request->weight,
          'tshirt_size' => $request->tshirtSize,
          'shoe_size' => $request->shoeSize,
          'head' => $request->head,
          'neck' => $request->neck,
          'shoulder' => $request->shoulder,
          'arm_length' => $request->armLength,
          'wrist' => $request->wrist,
          'bust' => $request->bust,
          'center_back' => $request->centerBack,
          'waist' => $request->waist,
          'hip' => $request->hip,
          'crotch_length' => $request->crotchLength,
          'inseam' => $request->inseam,
          'outseam' => $request->outseam,
          'ankle' => $request->ankle,
        ]);

      return redirect()->route('users.measurements.view', ['id' => $id], 303);
    }
}
