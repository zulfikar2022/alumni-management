import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function AllDepartments({ user = {}, departments = [] }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="University Departments" />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-black">
                {/* হেডার সেকশন */}
                <div className="border-b-4 border-black pb-4 mb-8">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                        University Departments
                    </h1>
                    <p className="text-xs font-bold uppercase text-gray-500 mt-1 italic">
                        Session Moderator View
                    </p>
                </div>

                {/* টেবিল কন্টেইনার */}
                <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-lg">
                    <table className="table w-full rounded-none">
                        {/* Table Head */}
                        <thead className="bg-black text-white uppercase text-[10px] tracking-widest border-none">
                            <tr className="border-none">
                                <th className="py-4 px-6 text-left">
                                    Department Name
                                </th>

                                <th className="text-center">Members Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-black font-bold uppercase text-[11px]">
                            {departments.map((dept) => (
                                <tr
                                    key={dept.id}
                                    className="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-black tracking-tight">
                                            {dept.name}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${dept.members_count > 0 ? "bg-green-500" : "bg-gray-300"}`}
                                            ></div>
                                            <span
                                                className={
                                                    dept.members_count > 0
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                }
                                            >
                                                {dept.members_count} Members
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <Link className="underline hover:bg-black hover:text-white px-2 py-1 transition-all">
                                            See Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ডাটা না থাকলে এম্পটি স্টেট */}
                    {departments.length === 0 && (
                        <div className="text-center py-20 bg-gray-50">
                            <p className="font-black uppercase text-gray-400 italic text-xl tracking-tighter">
                                No Departments Listed
                            </p>
                        </div>
                    )}
                </div>

                {/* ফুটার স্ট্যাটাস */}
                <div className="mt-6 flex justify-end">
                    <div className="border-2 rounded-lg border-black px-4 py-1 font-black text-xs uppercase bg-white">
                        Total Departments: {departments.length}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
