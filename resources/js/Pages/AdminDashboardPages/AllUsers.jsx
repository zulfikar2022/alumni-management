import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/Components/Pagination";
import axios from "axios";

export default function AllUsers({
    user = {},
    users = {},
    universities = [],
    filters = {},
}) {
    console.log(users.data);
    const [search, setSearch] = useState(filters.search || "");
    const [uniId, setUniId] = useState(filters.university_id || "");
    const [deptId, setDeptId] = useState(filters.department_id || "");
    const [uniSessionId, setUniSessionId] = useState(
        filters.university_session_id || "",
    );

    const [departments, setDepartments] = useState([]);
    const [sessions, setSessions] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (uniId) {
            axios
                .get(`/api/university-data/${uniId}`)
                .then((res) => {
                    setDepartments(res.data.departments);
                    setSessions(res.data.sessions);
                })
                .catch((err) =>
                    console.error("Error fetching university data", err),
                );
        } else {
            setDepartments([]);
            setSessions([]);
            setDeptId("");
            setUniSessionId("");
        }
    }, [uniId]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("admin.all-users"),
                {
                    search,
                    university_id: uniId,
                    department_id: deptId,
                    university_session_id: uniSessionId,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, uniId, deptId, uniSessionId]);

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Users Management" />

            <div className="max-w-7xl mx-auto py-10 px-4 space-y-6 text-black">
                <div className="border-b-4 border-black pb-2 mb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                        Registered Users
                    </h1>
                </div>

                {/* ফিল্টার এরিয়া */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px]">
                            Search User
                        </label>
                        <input
                            type="text"
                            placeholder="NAME / EMAIL..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered rounded-none border-black text-xs font-bold uppercase"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px]">
                            University
                        </label>
                        <select
                            value={uniId}
                            onChange={(e) => setUniId(e.target.value)}
                            className="select select-bordered rounded-none border-black text-xs font-bold uppercase"
                        >
                            <option value="">All Universities</option>
                            {universities.map((uni) => (
                                <option key={uni.id} value={uni.id}>
                                    {uni.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px]">
                            Department
                        </label>
                        <select
                            value={deptId}
                            onChange={(e) => setDeptId(e.target.value)}
                            disabled={!departments.length}
                            className="select select-bordered rounded-none border-black text-xs font-bold uppercase disabled:bg-gray-50"
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label uppercase font-black text-[10px]">
                            Session
                        </label>
                        <select
                            value={uniSessionId}
                            onChange={(e) => setUniSessionId(e.target.value)}
                            disabled={!sessions.length}
                            className="select select-bordered rounded-none border-black text-xs font-bold uppercase disabled:bg-gray-50"
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

                {/* টেবিল সেকশন */}
                <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <table className="table w-full rounded-none">
                        <thead className="bg-black text-white uppercase text-[10px] tracking-widest">
                            <tr className="border-none">
                                <th className="w-16">Profile</th>
                                <th>Name & Email</th>
                                <th>Academic Info</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black font-bold uppercase text-[11px]">
                            {users.data.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4">
                                        <div className="w-10 h-10 border-2 border-black bg-gray-100 overflow-hidden">
                                            {u.image_url ? (
                                                <img
                                                    src={`/storage/${u.image_url}`}
                                                    alt={u.name}
                                                    className="w-full h-full object-cover filter grayscale"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[10px]">
                                                    {u.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-black leading-tight">
                                            {u.name}
                                        </div>
                                        <div className="text-[9px] lowercase opacity-50 font-normal">
                                            {u.email}
                                        </div>
                                        <div>
                                            {u.is_approved ? (
                                                <span className="text-green-600 text-[9px] font-bold">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="text-red-600 text-[9px] font-bold">
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <span className="px-1 text-[9px] w-fit">
                                                {u.university?.name || "N/A"}
                                            </span>
                                            <span className="italic text-gray-400 text-[10px]">
                                                {u.department?.name || "N/A"}
                                            </span>
                                            <span className="text-[9px] opacity-70">
                                                {u.university_session
                                                    ? `Session: ${u.university_session.session}`
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <Link
                                            href={route(
                                                "admin.see-user-details",
                                                u.id,
                                            )}
                                            className="underline hover:bg-black hover:text-white px-2 py-1 transition-all"
                                        >
                                            See Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination links={users.links} />
            </div>
        </AuthenticatedLayout>
    );
}
