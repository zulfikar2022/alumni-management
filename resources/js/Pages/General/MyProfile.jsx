import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faPhone,
    faGlobe,
    faUserEdit,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

// user.update-profile-picture

export default function MyProfile({ user = {} }) {
    const [preview, setPreview] = useState(
        user.image_url ? `/storage/${user.image_url}` : null,
    );

    const { data, setData, put, post, processing, errors } = useForm({
        _method: "patch",
        phone_number: user.phone_number || "",
        whatsapp_number: user.whatsapp_number || "",
        show_phone_number: user.show_phone_number ?? true,
        show_whatsapp_number: user.show_whatsapp_number ?? true,
        social_links: user.social_links || {
            facebook: "",
            linkedin: "",
            instagram: "",
        },
        image: null,
    });

    const handleImageChange = async (e) => {
        const file = e?.target?.files[0];
        setData("image", file);

        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();

        if (!data.image) {
            alert("Please select an image first!");
            return;
        }
        // শুধুমাত্র ইমেজ এবং মেথড স্পুফিং পাঠানোর জন্য
        // আমরা সরাসরি router.post ব্যবহার করছি যাতে useForm এর internal data কনফ্লিক্ট না করে
        router.post(
            route("user.update-profile-picture"),
            {
                image: data.image,
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    // Inertia-তে অটো রিফ্রেশ হয়, তবুও প্রয়োজন হলে:
                    // Swal.fire("Success", "Profile picture updated!", "success");
                    window.location.reload();
                },
            },
        );
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("user.update-profile-details"), {
            onSuccess: () => {
                // make a forceful reload
                window.location.reload();
            },
        }); // এই রাউটটি ব্যাকএন্ডে তৈরি করতে হবে
    };

    return (
        <GeneralLayout user={user}>
            <Head title="My Profile" />

            <div className="max-w-4xl mx-auto py-10 px-4 text-black rounded-lg">
                {/* প্রোফাইল হেডার কার্ড */}
                <div className="border-4 border-black p-8 bg-white flex flex-col md:flex-row gap-8 items-center md:items-start relative rounded-lg">
                    {/* প্রোফাইল পিকচার সেকশন */}
                    <div className="relative group">
                        <div className="w-40 h-40 border-4 border-black bg-gray-100 overflow-hidden rounded-lg">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile"
                                    className="w-full h-full object-cover filter "
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="mt-2">
                            {data?.image && (
                                <button
                                    onClick={handleImageSubmit}
                                    className="border rounded-lg border-black p-2 font-bold hover:bg-black hover:text-white"
                                >
                                    Save Image
                                </button>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-black text-white p-2 cursor-pointer hover:bg-gray-800 border-2 border-white">
                            <FontAwesomeIcon icon={faCamera} />
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* ইউজার বেসিক ইনফো */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            {user.name}
                        </h1>
                        <p className="font-bold text-gray-500 uppercase italic">
                            {user.university?.name}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                            <span className="badge badge-outline rounded-lg border-black font-bold uppercase">
                                {user.department?.short_name ||
                                    user.department?.name ||
                                    "No Department"}
                            </span>
                            <span className="badge badge-neutral rounded-lg font-bold">
                                Session: {user.university_session?.session}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            document
                                .getElementById("edit_profile_modal")
                                .showModal()
                        }
                        className="btn btn-neutral rounded-lg border-black bg-black text-white hover:bg-white hover:text-black absolute top-4 right-4"
                    >
                        <FontAwesomeIcon
                            icon={faUserEdit}
                            className="mr-2"
                        />{" "}
                        Edit Info
                    </button>
                </div>

                {/* ইনফরমেশন গ্রিড (প্রিভিউ মোড) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 rounded-lg">
                    {/* কন্টাক্ট ইনফো */}
                    <div className="border-2 border-black p-6 bg-white rounded-lg">
                        <h2 className="text-xl font-black uppercase border-b-2 border-black mb-4">
                            Contact Details
                        </h2>
                        <div className="space-y-4 font-bold uppercase text-sm">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faPhone} />
                                <span>
                                    Phone: {user.phone_number || "Not Added"}
                                </span>
                                {user.show_phone_number ? (
                                    <span className="text-[10px] bg-green-100 px-1">
                                        Public
                                    </span>
                                ) : (
                                    <span className="text-[10px] bg-red-100 px-1">
                                        Private
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📱</span>
                                <span>
                                    WhatsApp:{" "}
                                    {user.whatsapp_number || "Not Added"}
                                    {user.show_whatsapp_number ? (
                                        <span className="text-[10px] bg-green-100 px-1">
                                            Public
                                        </span>
                                    ) : (
                                        <span className="text-[10px] bg-red-100 px-1">
                                            Private
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* সোশ্যাল লিঙ্কস */}
                    <div className="border-2 border-black p-6 bg-white rounded-lg">
                        <h2 className="text-xl font-black uppercase border-b-2 border-black mb-4">
                            Social Presence
                        </h2>
                        <div className="space-y-2">
                            {user.social_links &&
                                Object.entries(user.social_links).map(
                                    ([platform, link]) =>
                                        link && (
                                            <a
                                                key={platform}
                                                href={link}
                                                target="_blank"
                                                className="flex items-center gap-2 hover:underline font-bold uppercase text-xs"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faGlobe}
                                                />{" "}
                                                {platform}: {link}
                                            </a>
                                        ),
                                )}
                            {!user.social_links && (
                                <p className="text-gray-400 italic text-xs uppercase font-bold">
                                    No social links added
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* এডিট মোডাল */}
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box rounded-none border-4 border-black bg-white text-black max-w-2xl">
                    <h3 className="font-black text-2xl uppercase border-b-2 border-black mb-6">
                        Update Profile Information
                    </h3>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-bold uppercase text-xs">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    className="input input-bordered rounded-lg border-black"
                                />
                                <label className="label cursor-pointer justify-start gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={data.show_phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "show_phone_number",
                                                e.target.checked,
                                            )
                                        }
                                        className="checkbox rounded-lg checkbox-xs"
                                    />
                                    <span className="label-text font-bold text-[10px] uppercase">
                                        Publicly Visible
                                    </span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold uppercase text-xs">
                                    WhatsApp Number
                                </label>
                                <input
                                    type="text"
                                    value={data.whatsapp_number}
                                    onChange={(e) =>
                                        setData(
                                            "whatsapp_number",
                                            e.target.value,
                                        )
                                    }
                                    className="input input-bordered rounded-lg border-black"
                                />
                                <label className="label cursor-pointer justify-start gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={data.show_whatsapp_number}
                                        onChange={(e) =>
                                            setData(
                                                "show_whatsapp_number",
                                                e.target.checked,
                                            )
                                        }
                                        className="checkbox rounded-lg checkbox-xs"
                                    />
                                    <span className="label-text font-bold text-[10px] uppercase">
                                        Publicly Visible
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="divider border-black uppercase font-bold text-xs">
                            Social Links (URLs)
                        </div>
                        {["facebook", "linkedin", "instagram"].map(
                            (platform) => (
                                <div key={platform} className="form-control">
                                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
                                        <div className="col-span-1 flex items-center gap-2">
                                            {" "}
                                            <label className="label font-bold uppercase text-xs">
                                                {platform}
                                            </label>
                                        </div>
                                        <div className="col-span-7">
                                            <input
                                                type="text"
                                                value={
                                                    data.social_links[
                                                        platform
                                                    ] || ""
                                                }
                                                onChange={(e) => {
                                                    let links = {
                                                        ...data.social_links,
                                                    };
                                                    links[platform] =
                                                        e.target.value;
                                                    setData(
                                                        "social_links",
                                                        links,
                                                    );
                                                }}
                                                className="input input-bordered rounded-lg border-black h-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}

                        <div className="modal-action">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn bg-black text-white rounded-lg border-black w-full uppercase font-black"
                            >
                                {processing
                                    ? "Saving..."
                                    : "Save Profile Details"}
                            </button>
                        </div>
                    </form>
                    <form method="dialog" className="mt-2">
                        <button className="btn btn-outline border-black rounded-lg w-full uppercase font-bold">
                            Close
                        </button>
                    </form>
                </div>
            </dialog>
        </GeneralLayout>
    );
}
