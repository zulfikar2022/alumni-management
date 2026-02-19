import { Link } from "@inertiajs/react";

export default function AdminSidebar() {
    return (
        <div className="drawer drawer-end">
            <input
                id="admin-dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content ">
                {/* Page content here */}
                <div>content-1</div>
                <label
                    htmlFor="admin-dashboard-drawer"
                    className="drawer-button btn btn-primary bg-[#1d488a]"
                >
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="admin-dashboard-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-[#1d488a] min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li className="font-bold text-lg ">
                        University Management
                    </li>
                    <li className="ml-2">
                        <Link
                            href={route("admin.all-universities")}
                            className=""
                        >
                            See All Universities
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link className="">Add New University</Link>
                    </li>

                    <li className="font-bold text-lg ml-2">User Management</li>
                    <li className="ml-2">
                        <Link className="">See All Users</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
