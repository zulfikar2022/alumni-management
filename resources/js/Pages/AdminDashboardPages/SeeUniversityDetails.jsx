import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SeeUniversityDetails({ university = {}, user = {} }) {
    // সেশন এডিট করার জন্য স্টেট
    const [selectedSession, setSelectedSession] = useState(null);

    // সেশন আপডেট ফর্মের জন্য Inertia useForm
    const {
        data,
        setData,
        patch,
        put,
        processing: updating,
        reset,
        errors,
    } = useForm({
        session_name: "",
    });

    // সেশন ক্লিক করলে মোডাল ওপেন করার ফাংশন
    const openSessionModal = (session) => {
        setSelectedSession(session);
        setData("session_name", session.session); // সেশন নাম ইনপুটে সেট করা
        document.getElementById("session_modal").showModal();
    };

    // সেশন আপডেট সাবমিট
    const handleUpdateSession = (e) => {
        e.preventDefault();
        patch(route("admin.update-session", selectedSession.id), {
            data: {
                session_name: data.session_name,
            },
            onSuccess: () => {
                document.getElementById("session_modal").close();
                Swal.fire("Updated!", "Session has been updated.", "success");
            },
            preserveScroll: true,
        });
    };

    // সেশন ডিলিট করার ফাংশন
    const deleteSession = () => {
        // open a  confirmation dialog using browsers built-in confirm function
        confirm(
            "Are you sure you want to delete this session? This action cannot be undone.",
        ) &&
            router.delete(route("admin.delete-session", selectedSession.id), {
                onSuccess: () => {
                    document.getElementById("session_modal").close();
                    Swal.fire(
                        "Deleted!",
                        "Session has been deleted.",
                        "success",
                    );
                },
                preserveScroll: true,
            });
    };

    // ডিপার্টমেন্ট ডিলিট ফাংশন (আগের মতোই)
    function deleteDepartment(department) {
        Swal.fire({
            title: `Delete "${department?.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.delete-department", department.id), {
                    onSuccess: () =>
                        Swal.fire("Deleted!", "Department removed.", "success"),
                    preserveScroll: true,
                });
            }
        });
    }

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`Details - ${university.name}`} />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-black">
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b-4 border-black pb-8">
                    <div className="w-48 h-48 flex-shrink-0 border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <img
                            src={`/storage/${university.logo_url}`}
                            alt={university.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                            {university.name}
                        </h1>
                        <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold uppercase tracking-widest mb-4 rounded-lg">
                            {university.short_name}
                        </div>
                        <div className="flex justify-start gap-4 pt-6">
                            <Link
                                href={route(
                                    "admin.edit-university",
                                    university.id,
                                )}
                                className="btn btn-outline border-black rounded-lg font-black uppercase p-1 px-2 hover:text-white"
                            >
                                Edit University
                            </Link>
                            <Link
                                href={route(
                                    "admin.add-departments",
                                    university.id,
                                )}
                                className="btn bg-black text-white rounded-lg border-black font-black uppercase p-1 px-2"
                            >
                                Add Dept
                            </Link>
                            <Link
                                href={route(
                                    "admin.add-sessions",
                                    university.id,
                                )}
                                className="btn bg-black text-white rounded-lg border-black font-black uppercase p-1 px-2"
                            >
                                Add Session
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* 2. Departments Section */}
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
                                    <h3 className="font-black text-lg uppercase">
                                        {dept.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase italic opacity-70 group-hover:opacity-100">
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
                                        <button
                                            onClick={() =>
                                                deleteDepartment(dept)
                                            }
                                            className="text-red-600 underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Sessions Section */}
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
                                    onClick={() => openSessionModal(session)}
                                    className="border border-black text-center py-2 font-bold hover:bg-black hover:text-white transition-colors rounded-lg hover:cursor-pointer"
                                >
                                    {session.session}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Action Bar */}
            </div>

            {/* --- SESSION EDIT MODAL --- */}
            <dialog id="session_modal" className="modal">
                <div className="modal-box rounded-lg border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white text-black">
                    <h3 className="font-black text-xl uppercase border-b-2 border-black pb-2 mb-4">
                        Update Session
                    </h3>

                    <form onSubmit={handleUpdateSession} className="space-y-4">
                        <div className="form-control">
                            <label className="label uppercase font-bold text-xs">
                                Session Name
                            </label>
                            <input
                                type="text"
                                value={data.session_name}
                                onChange={(e) =>
                                    setData("session_name", e.target.value)
                                }
                                className="input input-bordered rounded-lg border-black focus:ring-1 focus:ring-black"
                                required
                            />
                            {errors.session_name && (
                                <span className="text-red-600 text-xs font-bold mt-1">
                                    {errors.session_name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 pt-4">
                            <button
                                type="submit"
                                disabled={updating}
                                className="btn bg-black text-white rounded-lg border-black hover:bg-white hover:text-black uppercase font-black"
                            >
                                {updating ? "Updating..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={deleteSession}
                                className="btn btn-outline border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 uppercase font-black"
                            >
                                Delete Session
                            </button>
                        </div>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/50">
                    <button>close</button>
                </form>
            </dialog>

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
