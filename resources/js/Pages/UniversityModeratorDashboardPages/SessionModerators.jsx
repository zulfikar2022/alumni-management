import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function SessionModerators({ user = {}, moderators = [] }) {
    console.log(moderators);
    return (
        <AuthenticatedLayout authUser={user}>
            <div>
                <h1>All Session Moderators of University</h1>
            </div>
        </AuthenticatedLayout>
    );
}
