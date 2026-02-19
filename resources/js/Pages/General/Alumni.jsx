import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Alumni({ user = {} }) {
    return (
        <GeneralLayout user={user}>
            <Head title="Alumni" />
            <div>
                <h1 className="text-black">Alumni</h1>
            </div>
        </GeneralLayout>
    );
}
