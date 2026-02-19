import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Messages({ user = {} }) {
    return (
        <GeneralLayout user={user}>
            <Head title="Messages" />
            <div>
                <h1 className="text-black">Messages</h1>
            </div>
        </GeneralLayout>
    );
}
