<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //

    protected function casts(): array
    {
        return [
            'is_deleted' => 'boolean',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
