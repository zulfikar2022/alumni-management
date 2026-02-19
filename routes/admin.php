<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard/admin/all-universities', [AdminController::class, 'allUniversities'])->name('admin.all-universities');

    Route::get('/dashboard/admin/add-university', [AdminController::class, 'addUniversity'])->name('admin.add-university');

    Route::get('/dashboard/admin/all-users', [AdminController::class, 'allUsers']);

    // Add more admin routes here
});
