import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function SeeUniversityDetails({ university = {}, user = {} }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`Details - ${university.name}`} />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-black">
                {/* 1. Header Section: University Info & Logo */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b-4 border-black pb-8">
                    <div className="w-48 h-48 flex-shrink-0 border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <img
                            src={`/storage/${university.logo_url}`}
                            alt={university.name}
                            className="w-full h-full object-contain filter "
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-black">
                            {university.name}
                        </h1>
                        <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold uppercase tracking-widest mb-4 rounded-lg">
                            {university.short_name}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* 2. Departments Section (Left Side) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-black uppercase border-b-2 border-black">
                                Departments
                            </h2>
                            <span className="badge badge-neutral rounded-lg font-bold">
                                {university.departments?.length || 0}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {university.departments?.map((dept) => (
                                <div
                                    key={dept.id}
                                    className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-all group rounded-lg flex flex-col items-start gap-2 justify-between"
                                >
                                    <h3 className="font-black text-lg uppercase leading-tight">
                                        {dept.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase mt-1 opacity-70 group-hover:opacity-100 italic">
                                        {dept.short_name}
                                    </p>
                                    <div className="flex gap-3">
                                        <Link
                                            href={route(
                                                "admin.edit-department",
                                                dept.id,
                                            )}
                                            className="underline"
                                        >
                                            Edit
                                        </Link>
                                        <button className="text-red-600 underline">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {university.departments?.length === 0 && (
                                <p className="italic text-gray-500 font-bold uppercase">
                                    No departments listed.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 3. Sessions Section (Right Side) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-black uppercase border-b-2 border-black">
                                Sessions
                            </h2>
                            <span className="badge badge-neutral rounded-lg font-bold">
                                {university.sessions?.length || 0}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {university.sessions?.map((session) => (
                                <div
                                    key={session.id}
                                    className="border border-black text-center py-2 font-bold hover:bg-black hover:text-white transition-colors rounded-lg"
                                >
                                    {session.session}
                                </div>
                            ))}
                            {university.sessions?.length === 0 && (
                                <p className="italic text-gray-500 font-bold uppercase">
                                    No sessions added.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. Action Bar (Optional) */}
                <div className="flex justify-end gap-4 border-t-2 border-black pt-6">
                    <Link
                        href={route("admin.edit-university", university.id)}
                        className="btn btn-outline border-black rounded-lg font-black uppercase hover:bg-black hover:text-white p-1"
                    >
                        Edit University
                    </Link>
                    <Link
                        href={route("admin.add-departments", university.id)}
                        className="btn bg-black text-white rounded-lg border-black hover:bg-white hover:text-black font-black uppercase p-1"
                    >
                        Add Department
                    </Link>
                    <Link
                        href={route("admin.add-sessions", university.id)}
                        className="btn bg-black text-white rounded-lg border-black hover:bg-white hover:text-black font-black uppercase p-1"
                    >
                        Add Session
                    </Link>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
            `,
                }}
            />
        </AuthenticatedLayout>
    );
}
