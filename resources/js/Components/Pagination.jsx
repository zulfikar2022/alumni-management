import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 mt-8 text-black">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 border-2 border-black text-xs font-black uppercase tracking-widest transition-all
                        ${link.active ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}
                        ${!link.url ? "opacity-30 cursor-not-allowed" : ""}
                    `}
                />
            ))}
        </div>
    );
}
