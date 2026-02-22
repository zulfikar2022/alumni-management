import { Link } from "@inertiajs/react";

export default function UniversityModeratorSideBar() {
    return (
        <div className="drawer drawer-end ">
            <input
                id="university-moderator-sidebar"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content">
                {/* Page content here */}
                <label
                    htmlFor="university-moderator-sidebar"
                    className="drawer-button btn btn-primary bg-[#1d488a]"
                >
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="university-moderator-sidebar"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-[#1d488a] min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link href={route("university-moderator.departments")}>
                            All Departments
                        </Link>
                    </li>
                    <li>
                        <Link href={route("university-moderator.members")}>
                            All Members
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route(
                                "university-moderator.session-moderators",
                            )}
                        >
                            Session Moderators
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
