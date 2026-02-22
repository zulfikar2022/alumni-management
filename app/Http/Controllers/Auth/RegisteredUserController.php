<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\University;
use App\Models\UniversitySession;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $universities = University::orderBy('name')->where('is_deleted', false)->get();
        return Inertia::render('Auth/Register', [
            'universities' => $universities,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'university_id' => 'required|exists:universities,id',
            'department_id' => 'nullable|exists:departments,id',
            'session_id' => 'nullable|exists:university_sessions,id',
        ]);

        $university = University::find($request->university_id);
        $department = Department::find($request->department_id);
        $session = UniversitySession::find($request->session_id);

        if ($university->is_deleted || $department->is_deleted || $session->is_deleted) {
            return back()->withErrors(['university_id' => 'Invalid university, department, or session selection.']);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'university_id' => $request->university_id,
            'department_id' => $request->department_id,
            'university_session_id' => $request->session_id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('user.my-profile', absolute: false));
    }
}
