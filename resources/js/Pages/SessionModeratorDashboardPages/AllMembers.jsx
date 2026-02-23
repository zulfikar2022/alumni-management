import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/Components/Pagination";

export default function AllMembers({ user = {}, data = {}, filters = {} }) {
    console.log(user);
    // ফিল্টার স্টেটসমূহ
    const [search, setSearch] = useState(filters.search || "");
    const [deptId, setDeptId] = useState(filters.department_id || "");

    const isFirstRender = useRef(true);

    // সার্চ এবং ফিল্টার পরিবর্তন হলে রিকোয়েস্ট পাঠানো (Debounced)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("session-moderator.all-members"), // আপনার রাউট নাম নিশ্চিত করুন
                { search, department_id: deptId },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, deptId]);

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Session Members" />

            <div className="max-w-7xl mx-auto py-10 px-4 space-y-8 text-black">
                {/* হেডার সেকশন */}
                <div className="border-b-4 border-black pb-4">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                        Session Members Directory
                    </h1>
                    <p className="text-xs font-bold uppercase text-gray-500 mt-1 italic">
                        University: {user.university?.short_name} | Total
                        Members: {data.total}
                    </p>
                </div>

                {/* ফিল্টার গ্রিড */}
                <div className="rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="form-control w-full">
                        <label className="label uppercase font-black text-[10px] block">
                            Search by Name/Email
                        </label>
                        <input
                            type="text"
                            placeholder="TYPE TO SEARCH..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered rounded-lg border-black focus:bg-black focus:text-white transition-all font-bold uppercase text-xs"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label uppercase font-black text-[10px] block">
                            Filter by Department
                        </label>
                        <select
                            value={deptId}
                            onChange={(e) => setDeptId(e.target.value)}
                            className="select select-bordered rounded-lg border-black font-bold uppercase text-xs"
                        >
                            <option value="">All Departments</option>
                            {/* মডারেটরের ইউনিভার্সিটির ডিপার্টমেন্টগুলো লুপ করা হচ্ছে */}
                            {user.departments?.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label uppercase font-black text-[10px] block">
                            Session:
                        </label>
                        <p>{user.university_session?.session}</p>
                    </div>
                </div>

                {/* মেম্বার টেবিল */}
                <div className="rounded-lg border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <table className="table w-full rounded-lg">
                        <thead className="bg-black text-white uppercase text-[10px] tracking-widest border-none">
                            <tr>
                                <th className="w-20">Profile</th>
                                <th>Identity</th>
                                <th>Academic Dept</th>
                                <th>Account Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black font-bold uppercase text-[11px]">
                            {data.data.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4">
                                        <div className="w-12 h-12 border-2 border-black bg-gray-100 overflow-hidden">
                                            {member.image_url ? (
                                                <img
                                                    src={`/storage/${member.image_url}`}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover "
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black text-white text-xs">
                                                    {member.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-black text-sm tracking-tight">
                                            {member.name}
                                        </div>
                                        <div className="text-[10px] lowercase font-normal text-gray-500">
                                            {member.email}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="bg-black text-white px-2 py-0.5 text-[10px]">
                                            {member.department?.name || "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        {member.is_approved ? (
                                            <span className="text-green-600 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                                Approved
                                            </span>
                                        ) : (
                                            <span className="text-red-500 underline decoration-dotted">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <Link
                                            href={route(
                                                "session-moderator.member-details",
                                                member.id,
                                            )}
                                            className="underline font-black hover:bg-black hover:text-white px-2 py-1 transition-all"
                                        >
                                            View Profile
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {data.data.length === 0 && (
                        <div className="text-center py-20 bg-gray-50">
                            <p className="font-black uppercase text-gray-400 italic tracking-widest">
                                No members found in this session.
                            </p>
                        </div>
                    )}
                </div>

                {/* প্যাগিনেশন কম্পোনেন্ট */}
                <Pagination links={data.links} />

                <div className="flex justify-between items-center font-black uppercase text-[10px] text-gray-400 border-t-2 border-black pt-4">
                    <span>
                        Showing {data.from} to {data.to} of {data.total} results
                    </span>
                    <span>
                        Page {data.current_page} of {data.last_page}
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
