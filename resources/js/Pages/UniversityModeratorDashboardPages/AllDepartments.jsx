import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function AllDepartments({ user = {}, departments = [] }) {
    const deleteDepartment = (dept) => {
        Swal.fire({
            title: `Delete "${dept.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "slategray",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.delete-department", dept.id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="All Departments" />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-black">
                {/* হেডার সেকশন */}
                <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            Departments Directory
                        </h1>
                        <p className="text-xs font-bold uppercase text-gray-500 mt-1">
                            Total Departments: {departments.length}
                        </p>
                    </div>
                </div>

                {/* টেবিল সেকশন */}
                <div className="border-2 border-black bg-white shadow-[8_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <table className="table w-full rounded-none">
                        {/* Table Head */}
                        <thead className="bg-black text-white uppercase text-xs tracking-widest border-none">
                            <tr className="border-none">
                                <th>Department Name</th>
                                <th>Short Name</th>
                                <th>Stats</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-black font-bold uppercase text-[11px]">
                            {departments.map((dept) => (
                                <tr
                                    key={dept.id}
                                    className="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4">
                                        <span className="text-sm font-black tracking-tight">
                                            {dept.name}
                                        </span>
                                    </td>
                                    <td>
                                        {dept.short_name ? (
                                            <span className="bg-black text-white px-2 py-0.5">
                                                {dept.short_name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 italic">
                                                N/A
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg">👥</span>
                                            <span>
                                                {dept.users_count || 0} Members
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ডাটা না থাকলে দেখানোর জন্য */}
                    {departments.length === 0 && (
                        <div className="text-center py-20 bg-gray-50">
                            <p className="font-black uppercase text-gray-300 italic text-xl tracking-tighter">
                                No Departments Available
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
