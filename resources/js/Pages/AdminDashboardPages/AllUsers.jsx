import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AllUsers({ user = {}, users = [] }) {
    console.log(users);
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="All users" />
            <div>
                <p className="text-black">All Users</p>
            </div>
        </AuthenticatedLayout>
    );
}
