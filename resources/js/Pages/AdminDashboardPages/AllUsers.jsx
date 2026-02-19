import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AllUsers({ user = {}, users = [] }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <div>
                <p className="text-black">All Users</p>
            </div>
        </AuthenticatedLayout>
    );
}
