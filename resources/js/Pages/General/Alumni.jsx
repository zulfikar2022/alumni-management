import GeneralLayout from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Alumni({ user = {} }) {
    return (
        <GeneralLayout user={user}>
            <Head title="Alumni" />
            <div>
                <h1>Alumnie</h1>
            </div>
        </GeneralLayout>
    );
}
