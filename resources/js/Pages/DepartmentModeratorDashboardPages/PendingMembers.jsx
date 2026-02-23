import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/Components/Pagination";

export default function PendingMembers({
    user = {},
    data = {},
    search: filterSearch = "",
}) {
    const [search, setSearch] = useState(filterSearch || "");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("department-moderator.pending-members"),
                { search },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Approved Members" />

            <div className="max-w-7xl mx-auto py-10 px-4 space-y-8 text-black">
                {/* হেডার সেকশন */}
                <div className="border-b-4 border-black pb-4 mb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-red-600">
                        Pending Members
                    </h1>
                    <p className="text-xs font-bold uppercase text-gray-500 mt-1 italic">
                        Department: {user.department?.short_name || "N/A"} |
                        Session: {user.university_session_id}
                    </p>
                </div>

                {/* সার্চ ফিল্টার */}
                <div className="p-5 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="form-control w-full md:w-1/3">
                        <label className="label uppercase font-black text-[10px]">
                            Search by Name or Email
                        </label>
                        <input
                            type="text"
                            placeholder="START TYPING..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered rounded-none border-black text-xs font-bold uppercase focus:bg-black focus:text-white transition-all"
                        />
                    </div>
                </div>

                {/* মেম্বার টেবিল */}
                <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <table className="table w-full rounded-none">
                        <thead className="bg-black text-white uppercase text-[10px] tracking-widest border-none">
                            <tr>
                                <th className="py-4">User</th>

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
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 border-2 border-black bg-gray-100 overflow-hidden flex-shrink-0">
                                                {member.image_url ? (
                                                    <img
                                                        src={`/storage/${member.image_url}`}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover "
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-black text-white text-[10px]">
                                                        {member.name
                                                            .substring(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-black text-sm">
                                                    {member.name}
                                                </div>
                                                <div className="text-[9px] lowercase opacity-50 font-normal">
                                                    {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-right">
                                        <Link
                                            href={route(
                                                "department-moderator.member-details",
                                                member.id,
                                            )}
                                            className="underline hover:bg-black hover:text-white px-2 py-1 transition-all"
                                        >
                                            DETAILS
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* প্যাগিনেশন */}
                <Pagination links={data.links} />

                {data.data.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-black">
                        <p className="font-black uppercase text-gray-400 italic tracking-widest text-lg">
                            No approved members found.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
