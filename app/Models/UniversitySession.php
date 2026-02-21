<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniversitySession extends Model
{
    //
    protected $fillable = [
        'university_id',
        'session',
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

    public function university()
    {
        return $this->belongsTo(University::class)->where('is_deleted', false);
    }
}
