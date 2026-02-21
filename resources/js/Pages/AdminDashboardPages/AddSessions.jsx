import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function AddSessions({ user = {}, university = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        university_id: university.id,
        sessions: [{ session: "" }],
    });

    const addMore = () => {
        setData("sessions", [...data.sessions, { session: "" }]);
    };

    const removeRow = (index) => {
        const values = [...data.sessions];
        values.splice(index, 1);
        setData("sessions", values);
    };

    const handleInputChange = (index, event) => {
        const values = [...data.sessions];
        values[index].session = event.target.value;
        setData("sessions", values);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.store-sessions", { university: university.id }));
    };

    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="Add Sessions" />

            <div className="max-w-3xl mx-auto py-10 px-4">
                <div className="border-b-4 border-black pb-4 mb-8">
                    <h1 className="font-black uppercase tracking-tight text-black">
                        Add Sessions to university:{" "}
                        <span className="underline text-black text-2xl">
                            {university?.name}
                        </span>
                    </h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                        {data.sessions.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-2 rounded-lg p-4 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative items-end"
                            >
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text font-bold uppercase text-xs">
                                            Session
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2020-2021"
                                        value={item.session}
                                        onChange={(e) =>
                                            handleInputChange(index, e)
                                        }
                                        className="input input-bordered rounded-lg border-black focus:outline-none focus:ring-1 focus:ring-black w-full"
                                        required
                                    />
                                    {errors[`sessions.${index}.session`] && (
                                        <span className="text-red-600 text-[10px] font-bold mt-1">
                                            {
                                                errors[
                                                    `sessions.${index}.session`
                                                ]
                                            }
                                        </span>
                                    )}
                                </div>

                                {data.sessions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index)}
                                        className="btn btn-square btn-outline border-black rounded-lg hover:bg-black hover:text-white"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-10 text-black">
                        <button
                            type="button"
                            onClick={addMore}
                            className="btn btn-outline  border-black rounded-lg hover:bg-black hover:text-white font-bold uppercase tracking-widest px-8"
                        >
                            + Add More Session
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`btn bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border-black font-black uppercase tracking-widest px-12 ${processing ? "loading" : ""}`}
                        >
                            {processing ? "Saving..." : "Submit Sessions"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
