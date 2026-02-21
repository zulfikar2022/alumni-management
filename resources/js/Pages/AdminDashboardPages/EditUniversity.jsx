import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function EditUniversity({ user = {}, university = {} }) {
    // ইমেজ প্রিভিউ স্টেট (পুরানো ইমেজটি ডিফল্ট হিসেবে থাকবে)
    const [preview, setPreview] = useState(
        university.logo_url ? `/storage/${university.logo_url}` : null,
    );

    const { data, setData, post, processing, errors, progress } = useForm({
        _method: "put", // লারাভেলকে আপডেট রিকোয়েস্ট বোঝানোর জন্য
        name: university.name || "",
        short_name: university.short_name || "",
        image: null, // নতুন ইমেজ দিলে এখানে থাকবে
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // যেহেতু ফাইল আছে, আমরা POST মেথড ব্যবহার করে _method: put পাঠাচ্ছি
        post(route("admin.update-university", university.id));
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`Edit - ${university.short_name}`} />

            <div className="flex justify-center items-center min-h-[85vh] px-4 py-8 text-black">
                <div className="card w-full max-w-lg bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                    <div className="card-body p-8">
                        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">
                                Edit University
                            </h2>
                            <span className="text-[10px] font-bold bg-black text-white px-2 py-1 uppercase">
                                ID: {university.id}
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* University Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        University Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={`input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full font-bold ${errors.name ? "border-red-500" : ""}`}
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-[10px] font-bold mt-1">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Short Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        Short Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.short_name}
                                    onChange={(e) =>
                                        setData("short_name", e.target.value)
                                    }
                                    className={`input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full font-bold ${errors.short_name ? "border-red-500" : ""}`}
                                />
                                {errors.short_name && (
                                    <span className="text-red-600 text-[10px] font-bold mt-1">
                                        {errors.short_name}
                                    </span>
                                )}
                            </div>

                            {/* Image Upload with Preview */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        Change Logo
                                    </span>
                                </label>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-24 h-24 border-2 border-black p-1 bg-gray-50 flex-shrink-0">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Logo"
                                                className="w-full h-full object-contain filter "
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                NO LOGO
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[10px] italic text-gray-500">
                                        Current logo shown on the left. Upload a
                                        new one to replace it.
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input file-input-bordered border-black rounded-lg w-full file:bg-black file:text-white file:rounded-lg file:border-none"
                                />
                                {errors.image && (
                                    <span className="text-red-600 text-[10px] font-bold mt-1">
                                        {errors.image}
                                    </span>
                                )}

                                {progress && (
                                    <progress
                                        className="progress progress-neutral w-full mt-2"
                                        value={progress.percentage}
                                        max="100"
                                    ></progress>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="card-actions flex-col gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`btn bg-black text-white rounded-lg border-black hover:bg-white hover:text-black w-full uppercase font-black tracking-widest ${processing ? "loading" : ""}`}
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update University"}
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
        </AuthenticatedLayout>
    );
}
