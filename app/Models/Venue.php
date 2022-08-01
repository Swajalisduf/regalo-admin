<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venue extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;

    protected $fillable = [
      'name'
    ];

    /**
     * Get all of the productions for the Venue
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productions(): HasMany
    {
      return $this->hasMany(Production::class, 'venue_id', 'id');
    }
}
