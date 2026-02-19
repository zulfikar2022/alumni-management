<?php

namespace App\Http\Controllers;

use App\Models\University;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function allUniversities($request)
    {
        $user = Auth::user();
        $search = $request->query('search');
        $universities = University::where('is_deleted', false)
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search . '%')->orWhere('short_name', 'like', '%' . $search . '%');
            })
            ->get();
        return Inertia::render('AdminDashboardPages/AllUniversities', ['universities' => $universities, 'user' => $user]);

    }

    public function addUniversity()
    {
        $user = Auth::user();
        return Inertia::render('AdminDashboardPages/AddUniversity', ['user' => $user]);
    }

    public function storeUniversity(Request $request)
    {
        dd("need to implement");
    }

    public function allUsers($request)
    {
        $user = Auth::user();
        $search = $request->query('search');
        $university_id = $request->query('university_id');
        $department_id = $request->query('department_id');
        $university_session_id = $request->query('university_session_id');

        $users = User::where('is_deleted', false)->when(
            $search,
            function ($q, $search) {
                return $q->where('name', 'LIKE', "%{$search}%")->orWhere('email', 'LIKE', "%{$search}%")->orWhere('phone_number', 'Like', "%{$search}%")->orWhere('whatsapp_number', 'LIKE', "%{$search}%");
            }
        )->when($university_id, function ($q, $university_id) {
            return $q->where('university_id', $university_id);
        })->when($department_id, function ($q, $department_id) {
            return $q->where('department_id', $department_id);
        })->when($university_session_id, function ($q, $university_session_id) {
            return $q->where('university_session_id', $university_session_id);
        })->get();

        // $users = User::where('is_deleted', false)->get();
        return Inertia::render('AdminDashboardPages/AllUsers', ['users' => $users, 'user' => $user]);
    }
}
