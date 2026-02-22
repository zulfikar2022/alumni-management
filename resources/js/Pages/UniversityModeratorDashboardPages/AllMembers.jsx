import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AllMembers({ user = {}, members = [] }) {
    console.log(members);
    return (
        <AuthenticatedLayout authUser={user}>
            <div>
                <h1>All Members of University</h1>
            </div>
        </AuthenticatedLayout>
    );
}
