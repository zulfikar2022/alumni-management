import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AddDepartments({ user = {}, university = {} }) {
    console.log(user, university);
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Add Department" />
            <div className="text-black">
                <p className="my-2 text-center text-xl">
                    Add Departments for University:{" "}
                    <span className="font-bold underline">
                        {university?.name}
                    </span>
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
