<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = Auth::user();

        return Inertia::render('General/MyProfile', [
            'user' => $request->user(),

        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('profile.edit');
        return Redirect::route('user.my-profile');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateProfileDetails(Request $request)
    {
        $user = $request->user();
        // $user = Auth::user();


        $request->validate([
            'phone_number' => 'nullable|string|max:20',
            'whatsapp_number' => 'nullable|string|max:20',
            'show_phone_number' => 'boolean',
            'show_whatsapp_number' => 'boolean',
            'social_links' => 'nullable|array',
        ]);



        // ডাটা আপডেট
        $user->phone_number = $request->input('phone_number');
        $user->whatsapp_number = $request->input('whatsapp_number');
        $user->show_phone_number = $request->input('show_phone_number', false);
        $user->show_whatsapp_number = $request->input('show_whatsapp_number', false);
        $user->social_links = $request->input('social_links', []);
        $user->save();



        return Redirect::route('user.my-profile')->with('success', 'Profile details updated successfully.');
    }

    public function updateProfileImage(Request $request)
    {

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // সর্বোচ্চ 5 মেগাবাইট
        ]);
        $user = $request->user();


        if ($request->hasFile('image')) {
            if ($user?->image_url) {
                Storage::disk('public')->delete($user->image_url);
            }
            // 'private' ডিস্কে 'institutions' ফোল্ডারে ইমেজটি স্টোর হবে
            // এটি storage/app/private/institutions পাথে সেভ হবে
            $imagePath = $request->file('image')->store('profile_pictures', 'public');
            $user->image_url = $imagePath;

        }

        $user->save();
        return redirect()->back();
    }
}
