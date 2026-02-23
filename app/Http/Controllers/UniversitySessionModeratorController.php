<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UniversitySessionModeratorController extends Controller
{
    public function allDepartmentsOfUniversity()
    {
        $user = Auth::user();
        $departments = $user->university->departments()->get();
        // in users table there is a called deaprtment_id which is the foreign key of departments table, so we can get the department of the user by using the department_id. But in that case I don't want the department of the user, rather I want the number of members in each department. So I will use the withCount method to get the number of members in each department.
        $departments = $departments->map(function ($department) {
            $department->members_count = $department->users()->count();
            return $department;
        });
        return Inertia::render('SessionModeratorDashboardPages/AllDepartments', [
            'user' => $user,
            'departments' => $departments,
        ]);
    }

    public function allMembersOfUniversity()
    {
        $user = request()->user();
        $user->load('university');
        $user->departments = $user->university->departments()->get();
        $user->university_session;
        // implement search on name and email and filter on department by extracting the search and department_id from the request
        $search = request()->query('search');
        $department_id = request()->query('department_id');

        $data = $user->university->users()->where('university_session_id', $user->university_session_id)->when($search, function ($query, $search) {
            return $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            });
        })->when($department_id, function ($query, $department_id) {
            return $query->where('department_id', $department_id);
        })->with('department')->paginate(10)->withQueryString();

        return Inertia::render('SessionModeratorDashboardPages/AllMembers', [
            'user' => $user,
            'data' => $data,
            'filters' => [
                'search' => $search,
                'department_id' => $department_id,
            ],
        ]);
    }

    public function memberDetails(User $member)
    {
        $member->load('department', 'university_session');
        return Inertia::render('SessionModeratorDashboardPages/MemberDetails', [
            'member' => $member,
            'user' => request()->user(),
        ]);
    }

    public function makeDepartmentModerator(User $member)
    {
        $member->is_department_moderator = true;
        $member->is_approved = true; // Approve the member when making them a department moderator
        $member->save();
        return redirect()->back();
    }

    public function removeDepartmentModerator(User $member)
    {
        $member->is_department_moderator = false;
        $member->save();
        return redirect()->back();
    }
}
