<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniversitySession extends Model
{
    //

    protected function casts(): array
    {
        return [
            'is_deleted' => 'boolean',
        ];
    }
}
