<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Show extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = true;

    protected $fillable = [
      'name',
      'author',
      'synopsis',
      'licencing_agency_id',
    ];

    /**
     * Get the licensing agency that owns the rights to the Show
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function licensingAgency(): BelongsTo
    {
      return $this->belongsTo(LicensingAgency::class);
    }

    /**
     * Get the productions that belongs to the Show
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function productions(): BelongsToMany
    {
      return $this->belongsToMany(Production::class);
    }
}
