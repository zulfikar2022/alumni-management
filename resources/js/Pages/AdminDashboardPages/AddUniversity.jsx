import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function AddUniversity({ user = {} }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        name: "",
        short_name: "",
        image: null,
    });

    // ইমেজ প্রিভিউ ইউআরএল রাখার জন্য স্টেট
    const [preview, setPreview] = useState(null);

    // ফাইল হ্যান্ডেল করার সময় প্রিভিউ তৈরি করা
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.store-university"), {
            onSuccess: () => {
                setData({
                    name: "",
                    short_name: "",
                    image: null,
                });
                setPreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <div className="flex justify-center items-center min-h-[85vh] px-4 py-8 text-black">
                <div className="card w-full max-w-lg bg-white border border-black  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-black uppercase tracking-tighter mb-6 border-b-2 border-black pb-2">
                            Add University
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* University Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. UNIVERSITY OF DHAKA"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={`input input-bordered rounded-lg border-black focus:outline-none    focus:ring-1 focus:ring-black w-full ${errors.name ? "border-red-500" : ""}`}
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-xs mt-1 font-bold">
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
                                    placeholder="e.g. DU"
                                    value={data.short_name}
                                    onChange={(e) =>
                                        setData("short_name", e.target.value)
                                    }
                                    className={`input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full ${errors.short_name ? "border-red-500" : ""}`}
                                />
                                {errors.short_name && (
                                    <span className="text-red-600 text-xs mt-1 font-bold">
                                        {errors.short_name}
                                    </span>
                                )}
                            </div>

                            {/* Logo Upload with Preview */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        University Logo
                                    </span>
                                </label>

                                {/* Image Preview Area */}
                                {preview ? (
                                    <div className="relative w-32 h-32 mb-4 border-2 border-black p-1">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreview(null);
                                                setData("image", null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-800"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 mb-4 border-2 border-dashed border-black flex items-center justify-center bg-gray-50 text-gray-400 text-[10px] text-center px-2">
                                        NO IMAGE SELECTED
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input file-input-bordered border-black rounded-none w-full file:bg-black file:text-white file:rounded-none file:border-none hover:file:bg-gray-800"
                                />
                                {errors.image && (
                                    <span className="text-red-600 text-xs mt-1 font-bold">
                                        {errors.image}
                                    </span>
                                )}

                                {progress && (
                                    <div className="mt-4">
                                        <progress
                                            className="progress progress-neutral w-full"
                                            value={progress.percentage}
                                            max="100"
                                        ></progress>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="card-actions justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`btn btn-neutral rounded-none bg-black text-white border-black hover:bg-white hover:text-black hover:border-black w-full uppercase font-black tracking-widest ${processing ? "loading" : ""}`}
                                >
                                    {processing ? "Processing..." : "Save Data"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
