<?php

namespace App\Models;
use App\Models\Measurement;
use TheaterCompany;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the measurements associated with the User
     *
     * @return \App\Models\HasOne
     */
    public function measurements(): HasOne
    {
        return $this->hasOne(Measurement::class, 'user_id', 'id');
    }

    /**
     * The theater companies that belong to the User
     *
     * @return \App\Models\BelongsToMany
     */
    public function theaterCompanies(): BelongsToMany
    {
        return $this->belongsToMany(TheaterCompany::class)->withTimestamps();
    } 
}
