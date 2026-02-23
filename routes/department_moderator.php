<?php

use App\Http\Controllers\DepartmentModeratorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'department_moderator'])->group(function () {
    // approved members
    Route::get('/department-moderator/approved-members', [DepartmentModeratorController::class, 'seeApprovedMembers'])->name('department-moderator.approved-members');

    // seePendingMembers

    Route::get('/department-moderator/pending-members', [DepartmentModeratorController::class, 'seePendingMembers'])->name('department-moderator.pending-members');

    // member details
    Route::get('/department-moderator/member/{member}', [DepartmentModeratorController::class, 'memberDetails'])->name('department-moderator.member-details');

    // approve request
    Route::get('/department-moderator/approve-member/{member}', [DepartmentModeratorController::class, 'approveJoinRequest'])->name('department-moderator.approve-member');

    // remove approval
    Route::get('/department-moderator/remove-approval/{member}', [DepartmentModeratorController::class, 'removeApproval'])->name('department-moderator.remove-approval');
});
