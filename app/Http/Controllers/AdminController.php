<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\University;
use App\Models\UniversitySession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Session\Session;

class AdminController extends Controller
{
    public function allUniversities(Request $request)
    {
        $user = Auth::user();
        $search = $request->query('search');
        // $universities = University::where('is_deleted', false)
        //     ->when($search, function ($query, $search) {
        //         return $query->where('name', 'like', '%' . $search . '%')->orWhere('short_name', 'like', '%' . $search . '%');
        //     })
        //     ->get();
        $universities = University::where('is_deleted', false)
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('short_name', 'like', '%' . $search . '%');
            });
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
        $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // সর্বোচ্চ 5 মেগাবাইট
        ]);

        $imagePath = null;

        // ২. ইমেজ হ্যান্ডেলিং
        if ($request->hasFile('image')) {
            // 'private' ডিস্কে 'institutions' ফোল্ডারে ইমেজটি স্টোর হবে
            // এটি storage/app/private/institutions পাথে সেভ হবে
            $imagePath = $request->file('image')->store('institutions', 'public');
        }

        // ৩. ডাটাবেসে সেভ করা
        University::create([
            'name' => $request->name,
            'short_name' => $request->short_name,
            'logo_url' => $imagePath, // পাউথটি ডাটাবেসে সেভ করে রাখা হচ্ছে
        ]);

        return redirect()->route('admin.all-universities')->with('success', 'University added successfully!');
    }

    public function allUsers(Request $request)
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

    public function addDepartments(Request $request, University $university)
    {
        return Inertia::render('AdminDashboardPages/AddDepartments', ['user' => Auth::user(), 'university' => $university]);
    }

    public function storeDepartments(Request $request, University $university)
    {
        $request->validate([
            'university_id' => 'required|exists:universities,id',
            'departments' => 'required|array|min:1',
            'departments.*.name' => 'required|string|max:255',
            'departments.*.short_name' => 'nullable|string|max:50',
        ]);
        // dd($request->all(), $university);

        foreach ($request->departments as $deptData) {
            // আপনি যদি সরাসরি রিলেশনশিপ ইউজ করতে চান
            // University::find($request->university_id)->departments()->create($deptData);

            Department::create([
                'university_id' => $university->id,
                'name' => $deptData['name'],
                'short_name' => $deptData['short_name'],
            ]);
        }

        return redirect()->route('admin.all-universities')->with('success', 'Departments added successfully!');
    }

    public function seeUniversityDetails(University $university)
    {
        $user = Auth::user();
        $university->load('departments');
        $university->load('sessions');
        return Inertia::render('AdminDashboardPages/SeeUniversityDetails', ['university' => $university, 'user' => $user]);
    }

    public function addSessions(University $university)
    {
        return Inertia::render('AdminDashboardPages/AddSessions', ['user' => Auth::user(), 'university' => $university]);
    }

    public function storeSessions(Request $request, University $university)
    {
        $request->validate([
            'sessions' => 'required|array|min:1',
            'sessions.*.session' => 'required|string|max:255',
        ]);

        // dd($request->all(), $university);

        foreach ($request->sessions as $sessionData) {
            UniversitySession::create([
                'university_id' => $university->id,
                'session' => $sessionData['session'],
            ]);
        }

        return redirect()->route('admin.see-university-details', $university)->with('success', 'Sessions added successfully!');
    }

    public function editUniversity(University $university)
    {
        return Inertia::render('AdminDashboardPages/EditUniversity', ['user' => Auth::user(), 'university' => $university]);
    }


    public function updateUniversity(Request $request, University $university)
    {
        // ১. ভ্যালিডেশন
        $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'image' => 'nullable|image|max:5120',
        ]);

        // ২. আগের ডাটা আপডেট করা
        $university->name = $request->name;
        $university->short_name = $request->short_name;

        // ৩. চেক করুন ইউজার নতুন ইমেজ আপলোড করেছে কি না
        if ($request->hasFile('image')) {

            // পুরানো ইমেজটি যদি ডাটাবেসে থাকে, তবে সেটি স্টোরেজ থেকে ডিলিট করুন
            if ($university->logo_url) {
                Storage::disk('public')->delete($university->logo_url);
            }

            // নতুন ইমেজটি সেভ করুন
            $path = $request->file('image')->store('institutions', 'public');

            // ডাটাবেসে নতুন পাথ সেট করুন
            $university->logo_url = $path;
        }

        // ৪. ফাইনালি সেভ করা
        $university->save();

        return redirect()->route('admin.all-universities')->with('success', 'University updated successfully!');
    }

    public function editDepartment(Department $department)
    {
        $department->load('university');
        // dd($department);
        return Inertia::render('AdminDashboardPages/EditDepartments', ['user' => Auth::user(), 'department' => $department]);
    }

    public function updateDepartment(Request $request, Department $department)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'nullable|string|max:50',
        ]);

        $department->name = $request->name;
        $department->short_name = $request->short_name;
        $department->save();

        return redirect()->route('admin.see-university-details', $department->university)->with('success', 'Department updated successfully!');
    }

    public function deleteDepartment(Department $department)
    {
        $department->is_deleted = true;
        $department->save();

        // find users who have department_id equal to the deleted department's id and set their department_id to null
        User::where('department_id', $department->id)->update(['department_id' => null]);

        return redirect()->route('admin.see-university-details', $department->university)->with('success', 'Department deleted successfully!');
    }

    public function updateSession(Request $request, UniversitySession $session)
    {
        $request->validate([
            'session_name' => 'required|string|max:255',
        ]);

        // dd($request->all(), $session);

        $session->session = $request->session_name;
        $session->save();

        return redirect()->route('admin.see-university-details', $session->university)->with('success', 'Session updated successfully!');
    }

    public function deleteSession(UniversitySession $session)
    {
        $session->is_deleted = true;
        $session->save();

        // find users who have university_session_id equal to the deleted session's id and set their university_session_id to null
        User::where('university_session_id', $session->id)->update(['university_session_id' => null]);

        return redirect()->route('admin.see-university-details', $session->university)->with('success', 'Session deleted successfully!');
    }

}
