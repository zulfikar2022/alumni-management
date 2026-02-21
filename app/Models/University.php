<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    //

    protected $fillable = [
        'name',
        'short_name',
        'logo_url',
    ];

    protected function casts(): array
    {
        return [
            'is_deleted' => 'boolean',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class)->where('is_deleted', false);
    }

    public function departments()
    {
        return $this->hasMany(Department::class)->where('is_deleted', false);
    }

    public function sessions()
    {
        return $this->hasMany(UniversitySession::class)->where('is_deleted', false);
    }
}
