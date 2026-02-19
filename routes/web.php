<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function () {
        if (!Auth::user()->is_approved) {
            return redirect()->route('user.my-profile');
        }
        return Inertia::render('Dashboard', ['user' => Auth::user()]);
    })->name('dashboard');

    Route::get('/my-profile', [UserController::class, 'myProfile'])->name('user.my-profile');
    Route::get('/alumni', [UserController::class, 'alumni'])->name('user.alumni');
    Route::get('/messages', [UserController::class, 'messages'])->name('user.messages');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
