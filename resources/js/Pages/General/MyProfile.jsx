import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function MyProfile({ user = {} }) {
    return (
        <GeneralLayout user={user}>
            <Head title="My Profile" />
            <div>
                <h1>My Profile</h1>
            </div>
        </GeneralLayout>
    );
}
