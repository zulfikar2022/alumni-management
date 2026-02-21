<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $with = ['university'];
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_university_moderator',
        'is_department_moderator',
        'is_session_moderator',
        'is_deleted',
        'is_approved',
        'show_phone_number',
        'show_whatsapp_number',
        'phone_number',
        'whatsapp_number',
        'university_id',
        'department_id',
        'university_session_id',
        'social_links',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class)->where('is_deleted', false);

    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class)->where('is_deleted', false);
    }
    public function university_session()
    {
        return $this->belongsTo(UniversitySession::class)->where('is_deleted', false);
    }
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_university_moderator' => 'boolean',
            'is_department_moderator' => 'boolean',
            'is_session_moderator' => 'boolean',
            'is_deleted' => 'boolean',
            'is_approved' => 'boolean',
            'show_phone_number' => 'boolean',
            'show_whatsapp_number' => 'boolean',
            'social_links' => 'array',
        ];
    }
}
