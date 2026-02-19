import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminSidebar from "./SideBars/AdminSidebar";

export default function Dashboard({ user }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <AdminSidebar />
            </div>
        </AuthenticatedLayout>
    );
}
