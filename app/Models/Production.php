<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Production extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;

    protected $fillable = [
      'name',
      'opening',
      'closing',
      'theater_company_id',
      'venue_id',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    /**
     * Get the show associated with the Production
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function show(): HasOne
    {
      return $this->hasOne(Show::class);
    }
    
    /**
     * Get the theater company associated with the Production
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function theaterCompany(): HasOne
    {
      return $this->hasOne(TheaterCompany::class, 'id', 'theater_company_id');
    }

    /**
     * Get the users associated with the Production
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users(): BelongsToMany
    {
      return $this->belongsToMany(User::class);
    }
    
    /**
     * Get the venue associated with the Production
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function venue(): HasOne
    {
      return $this->hasOne(Venue::class, 'id', 'venue_id');
    }
}
