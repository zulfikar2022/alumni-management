import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function EditDepartments({ user = {}, department = {} }) {
    // ইনারশিয়া useForm হুক
    const { data, setData, patch, processing, errors } = useForm({
        name: department.name || "",
        short_name: department.short_name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        // ডিপার্টমেন্ট আপডেট করার জন্য PATCH রিকোয়েস্ট
        console.log(data);
        patch(route("admin.update-department", department.id));
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`Edit Dept - ${department.short_name}`} />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-black">
                {/* Header Section */}
                <div className="border-b-4 border-black pb-4 mb-8">
                    <h1 className="text-3xl font-black uppercase tracking-tighter leading-none text-black">
                        Edit Department
                    </h1>
                    <p className="text-xs font-bold uppercase mt-2 text-gray-500">
                        University:{" "}
                        <span className="text-black underline">
                            {department.university?.name}
                        </span>
                    </p>
                </div>

                <div className="max-w-lg w-full mx-auto">
                    <div className="card bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                        <div className="card-body p-8">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Department Name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold uppercase text-xs">
                                            Full Name of Department
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="e.g. Computer Science and Engineering"
                                        className={`input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full font-bold ${errors.name ? "border-red-500" : ""}`}
                                    />
                                    {errors.name && (
                                        <span className="text-red-600 text-[10px] font-bold mt-1 uppercase">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                {/* Short Name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold uppercase text-xs">
                                            Short Name / Code
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.short_name}
                                        onChange={(e) =>
                                            setData(
                                                "short_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. CSE"
                                        className={`input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full font-bold ${errors.short_name ? "border-red-500" : ""}`}
                                    />
                                    {errors.short_name && (
                                        <span className="text-red-600 text-[10px] font-bold mt-1 uppercase">
                                            {errors.short_name}
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="card-actions flex-col gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`btn bg-black text-white rounded-lg border-black hover:bg-white hover:text-black w-full uppercase font-black tracking-widest ${processing ? "loading" : ""}`}
                                    >
                                        {processing
                                            ? "Updating..."
                                            : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="btn btn-outline border-black rounded-lg w-full uppercase font-bold hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
