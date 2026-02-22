import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminSidebar from "./SideBars/AdminSidebar";
import UniversityModeratorSideBar from "./SideBars/UniversityModeratorSideBar";

export default function Dashboard({ user, departments = [], sessions = [] }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Dashboard" />

            <div className="mt-2">
                {user.is_admin && <AdminSidebar />}
                {user.is_university_moderator && <UniversityModeratorSideBar />}
            </div>
        </AuthenticatedLayout>
    );
}
