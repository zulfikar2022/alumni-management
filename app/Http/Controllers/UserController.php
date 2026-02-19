<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function myProfile(Request $request)
    {
        return inertia('General/MyProfile', [
            'user' => Auth::user(),
        ]);
    }

    public function alumni()
    {
        if (!Auth::user()->is_approved) {
            return redirect()->route('user.my-profile');
        }
        return inertia('General/Alumni', [
            'user' => Auth::user()
        ]);
    }

    public function messages()
    {
        if (!Auth::user()->is_approved) {
            return redirect()->route('user.my-profile');
        }
        return inertia('General/Messages', [
            'user' => Auth::user()
        ]);
    }
}
