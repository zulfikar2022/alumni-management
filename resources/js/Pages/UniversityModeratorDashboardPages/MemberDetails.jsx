import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faGlobe,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function MemberDetails({ user = {}, targetUser = {} }) {
    console.log("Target User:", targetUser);
    const handleMakeSessionModerator = () => {
        // university-moderator.make-session-moderator
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make ${targetUser.name} a Session Moderator?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "slategray",
            confirmButtonText: "Yes, make moderator!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(
                    route(
                        "university-moderator.make-session-moderator",
                        targetUser.id,
                    ),
                    {},
                    {
                        onSuccess: () => {
                            // reload
                            window.location.reload();
                        },
                        onError: () => {
                            Swal.fire(
                                "Error!",
                                "Something went wrong. Please try again.",
                                "error",
                            );
                        },
                    },
                );
            }
        });
    };

    const handleRemoveSessionModerator = () => {
        // university-moderator.remove-session-moderator
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to remove ${targetUser.name} from Session Moderators?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "slategray",
            confirmButtonText: "Yes, remove moderator!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(
                    route(
                        "university-moderator.remove-session-moderator",
                        targetUser.id,
                    ),
                    {},
                    {
                        onSuccess: () => {
                            // reload
                            window.location.reload();
                        },
                        onError: () => {
                            Swal.fire(
                                "Error!",
                                "Something went wrong. Please try again.",
                                "error",
                            );
                        },
                    },
                );
            }
        });
    };
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`User Details - ${targetUser.name}`} />

            <div className="max-w-4xl mx-auto py-10 px-4 text-black">
                {/* প্রোফাইল হেডার কার্ড */}
                <div className="border-4 border-black p-8 bg-white flex flex-col md:flex-row gap-8 items-center md:items-start relative rounded-lg shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    {/* প্রোফাইল পিকচার সেকশন */}
                    <div className="w-40 h-40 border-4 border-black bg-gray-100 overflow-hidden rounded-lg flex-shrink-0">
                        {targetUser.image_url ? (
                            <img
                                src={`/storage/${targetUser.image_url}`}
                                alt={targetUser.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* ইউজার বেসিক ইনফো */}
                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <h1 className="text-4xl font-black uppercase tracking-tighter">
                                {targetUser.name}
                            </h1>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {targetUser.is_admin && (
                                <span className="badge badge-neutral bg-black text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                    Admin
                                </span>
                            )}
                            {targetUser.is_university_moderator && (
                                <span className="badge badge-neutral bg-gray-800 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                    University Moderator
                                </span>
                            )}
                            {targetUser.is_session_moderator && (
                                <span className="badge badge-neutral bg-gray-700 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                    Session Moderator
                                </span>
                            )}
                            {targetUser.is_department_moderator && (
                                <span className="badge badge-neutral bg-gray-600 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                    Department Moderator
                                </span>
                            )}
                        </div>

                        <p className="font-bold text-gray-500 uppercase italic leading-tight">
                            {targetUser.university?.name ||
                                "No University Added"}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                            <span className="badge badge-outline rounded-lg border-black font-bold uppercase p-3">
                                {targetUser.department?.name ||
                                    targetUser.department?.short_name ||
                                    "No Department"}
                            </span>
                            <span className="badge badge-neutral rounded-lg font-bold p-3">
                                Session:{" "}
                                {targetUser.university_session?.session ||
                                    "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold pt-2">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-gray-400"
                            />
                            <span className="lowercase">
                                {targetUser.email}
                            </span>
                        </div>
                        <div>
                            {!targetUser.is_session_moderator && (
                                <button
                                    onClick={handleMakeSessionModerator}
                                    className="border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-all"
                                >
                                    Make Session Moderator
                                </button>
                            )}
                            {targetUser.is_session_moderator && (
                                <button
                                    onClick={handleRemoveSessionModerator}
                                    className="border border-gray-400 px-4 py-2 rounded-md bg-red-600 text-white"
                                >
                                    Remove Session Moderator
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ইনফরমেশন গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* কন্টাক্ট ইনফো (প্রাইভেসি লজিক সহ) */}
                    <div className="border-2 border-black p-6 bg-white rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-xl font-black uppercase border-b-2 border-black mb-4 flex items-center gap-2">
                            Contact Details
                        </h2>
                        <div className="space-y-4 font-bold uppercase text-sm">
                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>Phone</span>
                                </div>
                                <span className="text-gray-600">
                                    {targetUser.show_phone_number
                                        ? targetUser.phone_number || "Not Added"
                                        : "Private"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">📱</span>
                                    <span>WhatsApp</span>
                                </div>
                                <span className="text-gray-600">
                                    {targetUser.show_whatsapp_number
                                        ? targetUser.whatsapp_number ||
                                          "Not Added"
                                        : "Private"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* সোশ্যাল লিঙ্কস */}
                    <div className="border-2 border-black p-6 bg-white rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-xl font-black uppercase border-b-2 border-black mb-4">
                            Social Presence
                        </h2>
                        <div className="space-y-3">
                            {targetUser.social_links &&
                            Object.values(targetUser.social_links).some(
                                (link) => link,
                            ) ? (
                                Object.entries(targetUser.social_links).map(
                                    ([platform, link]) =>
                                        link && (
                                            <a
                                                key={platform}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between group hover:bg-black hover:text-white p-2 transition-all border border-transparent hover:border-black"
                                            >
                                                <div className="flex items-center gap-2 font-bold uppercase text-xs">
                                                    <FontAwesomeIcon
                                                        icon={faGlobe}
                                                    />
                                                    {platform}
                                                </div>
                                                <span className="text-[10px] underline opacity-50 group-hover:opacity-100">
                                                    Visit
                                                </span>
                                            </a>
                                        ),
                                )
                            ) : (
                                <p className="text-gray-400 italic text-xs uppercase font-bold text-center py-4">
                                    No social links available
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ব্যাক বাটন */}
                <div className="mt-10 flex justify-center md:justify-start">
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-2 border-2 border-black font-black uppercase hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
