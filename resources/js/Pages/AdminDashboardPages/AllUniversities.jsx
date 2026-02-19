import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AllUniversities({ universities = [], user = {} }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <Head title="All Universities" />
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    All Universities
                </h1>
                <div className="mt-4">
                    {universities.map((university) => (
                        <div key={university.id} className="border p-4 mb-2">
                            <h2 className="text-xl font-semibold text-black">
                                {university.name}
                            </h2>
                            <p>{university.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
