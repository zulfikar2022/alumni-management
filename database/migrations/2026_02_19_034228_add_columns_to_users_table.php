<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // is_admin, is_university_moderator, is_department_moderator, is_session_moderator, is_deleted, is_approved,
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_university_moderator')->default(false);
            $table->boolean('is_department_moderator')->default(false);
            $table->boolean('is_session_moderator')->default(false);
            $table->boolean('is_deleted')->default(false);
            $table->boolean('is_approved')->default(false);

            // university_id, department_id, session_id
            $table->foreignId('university_id')->nullable()->constrained('universities')->onDelete('set null');
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('university_session_id')->nullable()->constrained('university_sessions')->onDelete('set null');

            // phone_number, whatsapp_number, show_phone_number, show_whatsapp_number, social_links(json), image_url
            $table->string('phone_number')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->boolean('show_phone_number')->default(false);
            $table->boolean('show_whatsapp_number')->default(false);
            $table->json('social_links')->nullable();
            $table->string('image_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'is_admin',
                'is_university_moderator',
                'is_department_moderator',
                'is_session_moderator',
                'is_deleted',
                'is_approved',
            ]);
        });
    }
};
