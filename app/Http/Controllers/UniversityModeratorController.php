<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UniversityModeratorController extends Controller
{
    public function allDepartmentsOfUniversity()
    {
        $user = Auth::user();
        $university = $user->university; // Assuming the user has a relationship with
        // Fetch all departments of the university
        $departments = $university->departments(); // Assuming the university has a relationship
        // I want to fetch the number of members in each department as well, so I will use the withCount method
        $departments = $university->departments()->withCount('users')->get();


        return Inertia::render('UniversityModeratorDashboardPages/AllDepartments', [
            'user' => $user,
            'departments' => $departments,
        ]);
    }

    public function allMembersOfUniversity()
    {
        $user = Auth::user();
        $university = $user->university;

        $search = request()->query('search', '');
        $department = request()->query('department', );
        $university_session = request()->query('university_session', );

        // dd($search, $department, $university_session);

        $all_deaprtments = $university->departments()->get();
        $all_university_sessions = $university->sessions()->get();
        // dd($all_deaprtments, $all_university_sessions);

        $members = $university->users()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%");
                });
            })
            ->when($department, function ($query, $department) {
                $query->where('department_id', $department);
            })
            ->when($university_session, function ($query, $university_session) {
                $query->where('university_session_id', $university_session);
            })->with('department', 'university_session')
            ->paginate(50)->withQueryString();


        return Inertia::render('UniversityModeratorDashboardPages/AllMembers', [
            'user' => $user,
            'data' => $members,
            'departments' => $all_deaprtments,
            'sessions' => $all_university_sessions,
            'filters' => [
                'search' => $search,
                'department' => $department,
                'university_session' => $university_session,
            ],
        ]);
    }


    public function allSessionModerators()
    {
        $user = Auth::user();
        $university = $user->university;

        $search = request()->query('search', '');
        $department = request()->query('department', );
        $university_session = request()->query('university_session', );

        $moderators = $university->users()
            ->where('is_session_moderator', true)
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%");
                });
            })
            ->when($department, function ($query, $department) {
                $query->where('department_id', $department);
            })
            ->when($university_session, function ($query, $university_session) {
                $query->where('university_session_id', $university_session);
            })
            ->get();

        return Inertia::render('UniversityModeratorDashboardPages/SessionModerators', [
            'user' => $user,
            'moderators' => $moderators,
        ]);
    }

    public function memberDetails($id)
    {
        $user = Auth::user();
        $targetUser = $user->university->users()->where('id', $id)->with('department', 'university_session')->firstOrFail();
        // dd($targetUser);

        return Inertia::render('UniversityModeratorDashboardPages/MemberDetails', [
            'user' => $user,
            'targetUser' => $targetUser,
        ]);
    }

    // make session moderator
    public function makeSessionModerator(Request $request, User $user)
    {
        $user->is_session_moderator = true;
        $user->is_approved = true; // Approve the user if they are being made a session moderator
        $user->save();

        $user = User::with('department', 'university_session')->find($user->id); // Refresh the user instance to get the latest data

        return redirect()->route('university-moderator.member-details', $user->id)->with('success', 'User has been made a session moderator successfully.');
    }

    public function removeSessionModerator(Request $request, User $user)
    {
        $user->is_session_moderator = false;
        $user->save();

        $user = User::with('department', 'university_session')->find($user->id); // Refresh the user instance to get the latest data

        return redirect()->route('university-moderator.member-details', $user->id)->with('success', 'User has been removed from session moderator successfully.');
    }
}
