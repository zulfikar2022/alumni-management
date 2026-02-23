import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faGlobe,
    faEnvelope,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function MemberDetails({ user = {}, member = {} }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title={`Member Details - ${member.name}`} />

            <div className="max-w-4xl mx-auto py-10 px-4 text-black">
                {/* প্রোফাইল হেডার কার্ড */}
                <div className="border-4 border-black p-8 bg-white flex flex-col md:flex-row gap-8 items-center md:items-start relative rounded-lg shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    {/* প্রোফাইল পিকচার সেকশন */}
                    <div className="w-40 h-40 border-4 border-black bg-gray-100 overflow-hidden rounded-lg flex-shrink-0">
                        {member.image_url ? (
                            <img
                                src={`/storage/${member.image_url}`}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase text-gray-400 text-center px-2">
                                No Profile Image
                            </div>
                        )}
                    </div>

                    {/* ইউজার বেসিক ইনফো */}
                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                {member.name}
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {!member.is_approved && (
                                    <span className="badge badge-error bg-red-600 text-white border-none rounded-none font-bold uppercase text-[10px]">
                                        Pending Approval
                                    </span>
                                )}
                                {member.is_admin && (
                                    <span className="badge badge-neutral bg-black text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                        Admin
                                    </span>
                                )}
                                {member.is_university_moderator && (
                                    <span className="badge badge-neutral bg-gray-800 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                        University Moderator
                                    </span>
                                )}
                                {member.is_session_moderator && (
                                    <span className="badge badge-neutral bg-gray-700 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                        Session Moderator
                                    </span>
                                )}
                                {member.is_department_moderator && (
                                    <span className="badge badge-neutral bg-gray-600 text-white rounded-none font-bold uppercase text-[10px] h-fit py-1">
                                        Department Moderator
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="font-bold text-gray-500 uppercase italic leading-tight">
                            {member.university?.name ||
                                "Institution Not Linked"}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                            <span className="badge badge-outline rounded-lg border-black font-black uppercase p-3">
                                {member.department?.name ||
                                    member.department?.short_name ||
                                    "N/A"}
                            </span>
                            <span className="badge badge-neutral rounded-lg font-black p-3 bg-black text-white">
                                Session:{" "}
                                {member.university_session?.session || "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold pt-2">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-gray-400"
                            />
                            <span className="lowercase border-b border-black">
                                {member.email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ইনফরমেশন গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* কন্টাক্ট ইনফো (প্রাইভেসি ফিল্টার সহ) */}
                    <div className="border-2 border-black p-6 bg-white rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-xl font-black uppercase border-b-2 border-black mb-4 flex items-center gap-2">
                            Contact Information
                        </h2>
                        <div className="space-y-4 font-bold uppercase text-xs">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="flex items-center gap-2 text-gray-400">
                                    <FontAwesomeIcon icon={faPhone} /> Phone
                                </span>
                                <span className="text-black">
                                    {member.show_phone_number &&
                                    member.phone_number
                                        ? member.phone_number
                                        : "Private"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="flex items-center gap-2 text-gray-400">
                                    <span className="text-lg">📱</span> WhatsApp
                                </span>
                                <span className="text-black">
                                    {member.show_whatsapp_number &&
                                    member.whatsapp_number
                                        ? member.whatsapp_number
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
                        <div className="space-y-2">
                            {member.social_links ? (
                                Object.entries(member.social_links).map(
                                    ([platform, link]) =>
                                        link && (
                                            <a
                                                key={platform}
                                                href={
                                                    link.startsWith("http")
                                                        ? link
                                                        : `https://${link}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between group p-2 border border-transparent hover:border-black hover:bg-black hover:text-white transition-all font-bold uppercase text-[10px]"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <FontAwesomeIcon
                                                        icon={faGlobe}
                                                    />{" "}
                                                    {platform}
                                                </span>
                                                <span className="underline opacity-0 group-hover:opacity-100 italic">
                                                    View
                                                </span>
                                            </a>
                                        ),
                                )
                            ) : (
                                <div className="text-center py-4 text-gray-400 italic font-bold uppercase text-[10px]">
                                    No Social Profiles Linked
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline border-2 border-black rounded-lg font-black uppercase hover:bg-black hover:text-white px-8"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
                        Back to List
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
