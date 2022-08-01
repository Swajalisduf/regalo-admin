<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use User;

class TheaterCompany extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;

    protected $fillable = [
      'name',
      'abbreviation',
    ];

    /**
     * Get the users that belong to the TheaterCompany
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get the productions that belong to the TheaterCompany
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productions(): HasMany
    {
      return $this->hasMany(Production::class);
    }
}
