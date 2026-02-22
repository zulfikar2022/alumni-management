import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/Components/Pagination";

export default function AllMembers({
    user = {},
    data = {},
    departments = [],
    sessions = [],
    filters = {},
}) {
    console.log(filters);
    // ফিল্টার স্টেটসমূহ
    const [search, setSearch] = useState(filters.search || "");
    const [deptId, setDeptId] = useState(filters.department_id || "");
    const [uniSessionId, setUniSessionId] = useState(
        filters.university_session_id || "",
    );

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("university-moderator.members"),
                {
                    search,
                    department: deptId,
                    university_session: uniSessionId,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, deptId, uniSessionId]);

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="University Members" />

            <div className="max-w-7xl mx-auto py-10 px-4 space-y-6 text-black">
                {/* হেডার সেকশন */}
                <div className="border-b-4 border-black pb-4 mb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                        University Members Directory
                    </h1>
                    <p className="text-xs font-bold uppercase text-gray-500 mt-1 italic">
                        Logged in as University Moderator:{" "}
                        {user.university?.short_name}
                    </p>
                </div>

                {/* ফিল্টার গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 border-2 border-black bg-white items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {/* সার্চ বক্স */}
                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px] block">
                            Search Member
                        </label>
                        <input
                            type="text"
                            placeholder="NAME OR EMAIL..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered rounded-none border-black text-xs font-bold uppercase focus:outline-none focus:bg-black focus:text-white transition-all "
                        />
                    </div>

                    {/* ডিপার্টমেন্ট ফিল্টার */}
                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px] block">
                            Department
                        </label>
                        <select
                            value={deptId}
                            onChange={(e) => setDeptId(e.target.value)}
                            className="select select-bordered rounded-none border-black text-xs font-bold uppercase"
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* সেশন ফিল্টার */}
                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px] block">
                            Session
                        </label>
                        <select
                            value={uniSessionId}
                            onChange={(e) => setUniSessionId(e.target.value)}
                            className="select select-bordered rounded-none border-black text-xs font-bold uppercase"
                        >
                            <option value="">All Sessions</option>
                            {sessions.map((sess) => (
                                <option key={sess.id} value={sess.id}>
                                    {sess.session}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* মেম্বার টেবিল */}
                <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <table className="table w-full rounded-none">
                        <thead className="bg-black text-white uppercase text-[10px] tracking-widest border-none">
                            <tr>
                                <th className="py-4">Profile</th>
                                <th>Name & Email</th>
                                <th>Academic Info</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black font-bold uppercase text-[11px]">
                            {data.data.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3">
                                        <div className="w-10 h-10 border-2 border-black bg-gray-100 overflow-hidden">
                                            {member.image_url ? (
                                                <img
                                                    src={`/storage/${member.image_url}`}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover filter grayscale"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[10px]">
                                                    {member.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-black text-sm">
                                            {member.name}
                                        </div>
                                        <div className="text-[9px] lowercase opacity-50 font-normal">
                                            {member.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <span className="italic text-gray-400 text-[10px]">
                                                {member.department?.name ||
                                                    "N/A"}
                                            </span>
                                            <span className="bg-black text-white px-1 text-[9px] w-fit">
                                                Session:{" "}
                                                {member.university_session
                                                    ?.session || "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {member.is_approved ? (
                                            <span className="text-green-600">
                                                ● Approved
                                            </span>
                                        ) : (
                                            <span className="text-red-500 underline decoration-dotted">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <button className="underline hover:bg-black hover:text-white px-2 py-1 transition-all">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination links={data.links} />

                {data.data.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-black">
                        <p className="font-black uppercase text-gray-400 italic tracking-widest">
                            No members found matching your filters.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
