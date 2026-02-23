<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepartmentModeratorController extends Controller
{
    //

    public function seeApprovedMembers()
    {
        $search = request()->query('search');
        $user = Auth::user();

        $data = User::where('department_id', $user->department_id)
                    ->where('university_session_id', $user->university_session_id)
                    ->where('is_approved', true)
                    ->where('is_deleted', false)
                    ->when($search, function ($query) use ($search) {
                        $query->where(function ($q) use ($search) {
                            $q->where('name', 'like', "%$search%")
                                ->orWhere('email', 'like', "%$search%");
                        });
                    })
                    ->paginate(50)->withQueryString();


        return Inertia::render('DepartmentModeratorDashboardPages/ApprovedMembers', [
            'data' => $data,
            'user' => $user,
            'search' => $search,
        ]);

    }

    public function seePendingMembers()
    {
        $search = request()->query('search');
        $user = Auth::user();

        $data = User::where('department_id', $user->department_id)
                    ->where('university_session_id', $user->university_session_id)
                    ->where('is_approved', false)
                    ->where('is_deleted', false)
                    ->when($search, function ($query) use ($search) {
                        $query->where(function ($q) use ($search) {
                            $q->where('name', 'like', "%$search%")
                                ->orWhere('email', 'like', "%$search%");
                        });
                    })
                    ->paginate(50)->withQueryString();


        return Inertia::render('DepartmentModeratorDashboardPages/PendingMembers', [
            'data' => $data,
            'user' => $user,
            'search' => $search,
        ]);
    }

    // member details
    public function memberDetails(User $member)
    {
        $user = Auth::user();
        // dd($user, $member);

        // check if the member belongs to the same department and session
        if ($member->department_id !== $user->department_id || $member->university_session_id !== $user->university_session_id) {
            abort(403, 'Unauthorized access');
        }
        $member->load('department', 'university_session');
        return Inertia::render('DepartmentModeratorDashboardPages/MemberDetails', [
            'user' => $user,
            'member' => $member,
        ]);
    }

    // approve join request
    public function approveJoinRequest(User $member)
    {
        $user = Auth::user();

        // check if the member belongs to the same department and session
        if ($member->department_id !== $user->department_id || $member->university_session_id !== $user->university_session_id) {
            abort(403, 'Unauthorized access');
        }

        $member->is_approved = true;
        $member->save();
        return redirect()->back()->with('success', 'Member approved successfully.');
    }

    public function removeApproval(User $member)
    {
        $user = Auth::user();

        // check if the member belongs to the same department and session
        if ($member->is_admin || $member->is_university_moderator || $member->is_session_moderator || $member->is_department_moderator) {
            abort(403, 'Cannot remove approval from an admin or moderator');
        }
        if ($member->department_id !== $user->department_id || $member->university_session_id !== $user->university_session_id) {
            abort(403, 'Unauthorized access');
        }

        $member->is_approved = false;
        $member->save();
        return redirect()->back()->with('success', 'Member approval removed successfully.');
    }
}
