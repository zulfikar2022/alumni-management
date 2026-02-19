import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AddUniversity({ user = {} }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <div>
                <p className="text-black">Add University</p>
            </div>
        </AuthenticatedLayout>
    );
}
