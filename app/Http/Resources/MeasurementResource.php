<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
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
          'height' => $this->height,
          'weight' => $this->weight,
          'tshirtSize' => $this->tshirt_size,
          'shoeSize' => $this->shoe_size,
          'head' => $this->head,
          'neck' => $this->neck,
          'shoulder' => $this->shoulder,
          'armLength' => $this->arm_length,
          'wrist' => $this->wrist,
          'bust' => $this->bust,
          'centerBack' => $this->center_back,
          'waist' => $this->waist,
          'hip' => $this->hip,
          'crotchLength' => $this->crotch_length,
          'inseam' => $this->inseam,
          'outseam' => $this->outseam,
          'ankle' => $this->ankle,
        ];
    }
}
