import AuthenticatedLayout from "./AuthenticatedLayout";

export default function GeneralLayout({ children, user = {} }) {
    return (
        <AuthenticatedLayout authUser={user}>
            <div>{children}</div>
        </AuthenticatedLayout>
    );
}
