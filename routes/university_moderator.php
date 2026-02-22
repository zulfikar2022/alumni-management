<?php

use App\Http\Controllers\UniversityModeratorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'university_moderator'])->group(function () {
    // all departments of university route
    Route::get('/dashboard/university-moderator/departments', [UniversityModeratorController::class, 'allDepartmentsOfUniversity'])->name('university-moderator.departments');

    // all members of university route
    Route::get('/dashboard/university-moderator/members', [UniversityModeratorController::class, 'allMembersOfUniversity'])->name('university-moderator.members');

    // all session moderators of university route
    Route::get('/dashboard/university-moderator/session-moderators', [UniversityModeratorController::class, 'allSessionModerators'])->name('university-moderator.session-moderators');

    // member details
    Route::get('/dashboard/university-moderator/members/{id}', [UniversityModeratorController::class, 'memberDetails'])->name('university-moderator.member-details');

    // make session moderator
    Route::get('/dashboard/university-moderator/members/{user}/make-session-moderator', [UniversityModeratorController::class, 'makeSessionModerator'])->name('university-moderator.make-session-moderator');

    // remove session moderator
    Route::get('/dashboard/university-moderator/members/{user}/remove-session-moderator', [UniversityModeratorController::class, 'removeSessionModerator'])->name('university-moderator.remove-session-moderator');
});
