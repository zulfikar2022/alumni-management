<?php

use App\Http\Controllers\UniversitySessionModeratorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'session_moderator'])->group(function () {

    Route::get('/session-moderator/all-departments', [UniversitySessionModeratorController::class, 'allDepartmentsOfUniversity'])->name('session-moderator.all-departments');

    Route::get('/session-moderator/all-members', [UniversitySessionModeratorController::class, 'allMembersOfUniversity'])->name('session-moderator.all-members');

    // membe details
    Route::get('/session-moderator/member/{member}', [UniversitySessionModeratorController::class, 'memberDetails'])->name('session-moderator.member-details');

    // make department moderator
    Route::get('/session-moderator/member/{member}/make-department-moderator', [UniversitySessionModeratorController::class, 'makeDepartmentModerator'])->name('session-moderator.make-department-moderator');

    // remove department moderator
    Route::get('/session-moderator/member/{member}/remove-department-moderator', [UniversitySessionModeratorController::class, 'removeDepartmentModerator'])->name('session-moderator.remove-department-moderator');

});
