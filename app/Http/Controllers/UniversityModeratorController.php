<?php

namespace App\Http\Controllers;

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
        $departments = $university->departments; // Assuming the university has a relationship
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
            })
            ->get();

        return Inertia::render('UniversityModeratorDashboardPages/AllMembers', [
            'user' => $user,
            'members' => $members,
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
}
