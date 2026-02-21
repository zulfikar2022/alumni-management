import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react"; // router ইমপোর্ট করুন
import { useState, useEffect } from "react";

export default function AllUniversities({
    universities = [],
    user = {},
    filters = {},
}) {
    // সার্চ ভ্যালু রাখার জন্য স্টেট (ব্যাবহারকারীর ইনপুট)
    const [search, setSearch] = useState(filters.search || "");

    // ইউজার যখন টাইপ করা বন্ধ করবে, তখন ৫ সেকেন্ডের (বা ৩০০-৫০০ms) গ্যাপে রিকুয়েস্ট যাবে
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("admin.all-universities"), // আপনার রাউট নাম দিন
                { search: search },
                {
                    preserveState: true, // সার্চ করার সময় ইনপুট বক্স থেকে ফোকাস হারাবে না
                    replace: true, // ব্রাউজার হিস্ট্রিতে প্রতিটা অক্ষরের জন্য আলাদা এন্ট্রি হবে না
                },
            );
        }, 500); // ৫০০ মিলিসেকেন্ড ডিলে

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="All Universities" />

            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-6 mb-8 gap-4">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
                        Universities
                    </h1>

                    {/* সার্চ বার - ব্ল্যাক অ্যান্ড হোয়াইট স্টাইল */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR SHORT NAME..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:bg-black focus:text-white transition-all placeholder:text-gray-400 placeholder:font-bold text-sm uppercase"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-2 font-bold hover:text-red-500"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* ইউনিভার্সিটি গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {universities.map((university) => (
                        <div
                            key={university?.id}
                            className="flex items-center gap-6 border-2 rounded-lg border-black p-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="w-20 h-20 flex-shrink-0 border-2 border-black p-1">
                                <img
                                    src={`/storage/${university.logo_url}`}
                                    alt="Logo"
                                    className="w-full h-full object-contain filter "
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-black uppercase leading-tight text-black">
                                    {university.name}
                                </h2>
                                <p className="text-xs font-bold text-gray-500 mt-1">
                                    {university.short_name}
                                </p>
                                <div className="text-black flex gap-2 flex-wrap ">
                                    <Link
                                        href={route("admin.edit-university", {
                                            university: university.id,
                                        })}
                                        className="border border-black p-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.add-departments",
                                            university?.id,
                                        )}
                                        className="border border-black p-1 rounded"
                                    >
                                        Add Departments
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.add-sessions",
                                            university?.id,
                                        )}
                                        className="border border-black p-1 rounded"
                                    >
                                        Add Sessions
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.see-university-details",
                                            university?.id,
                                        )}
                                        className="border border-black p-1 rounded"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {universities.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-black">
                        <p className="font-bold uppercase text-gray-400 italic">
                            No matching results found.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
