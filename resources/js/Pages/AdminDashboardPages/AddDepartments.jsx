import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function AddDepartments({ user = {}, university = {} }) {
    // Inertia useForm হুক
    const { data, setData, post, processing, errors } = useForm({
        university_id: university.id,
        departments: [
            { name: "", short_name: "" }, // ডিফল্টভাবে একটি রো থাকবে
        ],
    });

    // নতুন রো যোগ করার ফাংশন
    const addMore = () => {
        setData("departments", [
            ...data.departments,
            { name: "", short_name: "" },
        ]);
    };

    // নির্দিষ্ট রো রিমুভ করার ফাংশন
    const removeRow = (index) => {
        const values = [...data.departments];
        values.splice(index, 1);
        setData("departments", values);
    };

    // ইনপুট চেঞ্জ হ্যান্ডেল করা
    const handleInputChange = (index, event) => {
        const values = [...data.departments];
        values[index][event.target.name] = event.target.value;
        setData("departments", values);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("admin.store-departments", university.id)); // আপনার রাউট নাম অনুযায়ী পরিবর্তন করুন
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Add Departments" />

            <div className="max-w-4xl mx-auto py-10 px-4">
                <div className="border-b-4 border-black pb-4 mb-8">
                    <h1 className=" font-black uppercase tracking-tight text-black">
                        Add Departments for:{" "}
                        <span className="underline text-2xl">
                            {university?.name}
                        </span>
                    </h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {data.departments.map((dept, index) => (
                        <div
                            key={dept.id || index}
                            className="flex flex-col rounded-lg text-black md:flex-row gap-4 p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        >
                            {/* Department Name */}
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        Dept. Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Computer Science and Engineering"
                                    value={dept.name}
                                    onChange={(e) =>
                                        handleInputChange(index, e)
                                    }
                                    className="input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full"
                                    required
                                />
                                {errors[`departments.${index}.name`] && (
                                    <span className="text-red-600 text-[10px] font-bold mt-1">
                                        {errors[`departments.${index}.name`]}
                                    </span>
                                )}
                            </div>

                            {/* Short Name */}
                            <div className="form-control md:w-1/3">
                                <label className="label">
                                    <span className="label-text font-bold uppercase text-xs">
                                        Short Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="short_name"
                                    placeholder="e.g. CSE"
                                    value={dept.short_name}
                                    onChange={(e) =>
                                        handleInputChange(index, e)
                                    }
                                    className="input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full"
                                />
                            </div>

                            {/* Remove Button */}
                            {data.departments.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRow(index)}
                                    className="btn btn-square btn-outline border-black rounded-lg hover:bg-black hover:text-white mt-auto"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
                        <button
                            type="button"
                            onClick={addMore}
                            className="btn text-black btn-outline border-black rounded-lg hover:bg-black hover:text-white font-bold uppercase tracking-widest px-8"
                        >
                            + Add More
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`btn bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border-black font-black uppercase tracking-widest px-12 ${processing ? "loading" : ""}`}
                        >
                            {processing ? "Submitting..." : "Submit All"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
