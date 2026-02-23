import { Link } from "@inertiajs/react";

export default function DepartmentModeratorSidebar() {
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-5"
                    className="drawer-button btn btn-primary bg-[#1d488a]"
                >
                    Department Moderator
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-5"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-[#1d488a] min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link
                            href={route(
                                "department-moderator.approved-members",
                            )}
                        >
                            All Approved Members
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("department-moderator.pending-members")}
                        >
                            All Pending Members
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
