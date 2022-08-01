<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class LicensingAgency extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = true;

    protected $fillable = [
      'name',
      'url',
    ];

    /**
     * Get all of the shows for the LicensingAgency
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function shows(): HasMany
    {
        return $this->hasMany(Show::class);
    }
}
