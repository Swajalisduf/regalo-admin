<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
      'user_id',
      'height',
      'weight',
      'tshirt_size',
      'shoe_size',
      'head',
      'neck',
      'shoulder',
      'arm_length',
      'wrist',
      'bust',
      'center_back',
      'waist',
      'hip',
      'crotch_length',
      'inseam',
      'outseam',
      'ankle',
      'created_at',
      'updated_at',
    ];
}
