<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::put('/user/update-profile', [ProfileController::class, 'updateProfileDetails'])->name('user.update-profile-details');
    Route::post('/user/update-profile-picture', [ProfileController::class, 'updateProfileImage'])->name('user.update-profile-picture');
});
