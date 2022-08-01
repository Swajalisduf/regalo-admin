<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\MeasurementResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
      return [
        'id' => $this->id,
        'name' => $this->name,
        'firstName' => explode(' ', $this->name)[0],
        'lastName' => explode(' ', $this->name)[1],
        'email' => $this->email,
        'measurements' => new MeasurementResource($this->whenLoaded('measurements')),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
  }
}
