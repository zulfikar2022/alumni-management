<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard/admin/all-universities', [AdminController::class, 'allUniversities'])->name('admin.all-universities');

    Route::get('/dashboard/admin/add-university', [AdminController::class, 'addUniversity'])->name('admin.add-university');

    Route::post('/dashboard/admin/store-university', [AdminController::class, 'storeUniversity'])->name('admin.store-university');

    Route::get('/dashboard/admin/all-users', [AdminController::class, 'allUsers'])->name('admin.all-users');

    Route::get('/dashboard/admin/add-departments/{university}', [AdminController::class, 'addDepartments'])->name('admin.add-departments');

    Route::post('/dashboard/admin/store-departments/{university}', [AdminController::class, 'storeDepartments'])->name('admin.store-departments');

    Route::get('/dashboard/admin/university/{university}', [AdminController::class, 'seeUniversityDetails'])->name('admin.see-university-details');

    Route::get('/dashboard/admin/university/{university}/sessions', [AdminController::class, 'addSessions'])->name('admin.add-sessions');
    Route::post('/dashboard/admin/university/{university}/sessions', [AdminController::class, 'storeSessions'])->name('admin.store-sessions');

    Route::get('/dashboard/admin/university/{university}/edit', [AdminController::class, 'editUniversity'])->name('admin.edit-university');

    Route::put('/dashboard/admin/university/{university}', [AdminController::class, 'updateUniversity'])->name('admin.update-university');

    Route::get('/dashboard/admin/department/{department}/edit', [AdminController::class, 'editDepartment'])->name('admin.edit-department');
    Route::patch('/dashboard/admin/department/{department}', [AdminController::class, 'updateDepartment'])->name('admin.update-department');

    Route::delete('/dashboard/admin/department/{department}', [AdminController::class, 'deleteDepartment'])->name('admin.delete-department');

    // update session
    Route::patch('/dashboard/admin/session/{session}/update', [AdminController::class, 'updateSession'])->name('admin.update-session');

    // delete session
    Route::delete('/dashboard/admin/session/{session}/delete', [AdminController::class, 'deleteSession'])->name('admin.delete-session');

    // Add more admin routes here
});
