import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";

export default function Register({ universities = [] }) {
    const [departments, setDepartments] = useState([]);
    const [sessions, setSessions] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        university_id: "",
        department_id: "",
        session_id: "",
    });

    // ইউনিভার্সিটি পরিবর্তন হলে ডিপার্টমেন্ট এবং সেশন ফেচ করা
    useEffect(() => {
        if (data.university_id) {
            axios
                .get(`/api/university-data/${data.university_id}`)
                .then((response) => {
                    setDepartments(response.data.departments);
                    setSessions(response.data.sessions);
                    // রিসেট ডিপার্টমেন্ট এবং সেশন যখন ইউনিভার্সিটি চেঞ্জ হবে
                    setData((prev) => ({
                        ...prev,
                        department_id: "",
                        session_id: "",
                    }));
                })
                .catch((error) => console.error("Error fetching data", error));
        } else {
            setDepartments([]);
            setSessions([]);
        }
    }, [data.university_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-4 text-black">
                {/* Name, Email, Password Fields (আগের মতোই থাকবে) */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* --- ইউনিভার্সিটি ড্রপডাউন --- */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="university_id"
                        value="Select University"
                    />
                    <select
                        id="university_id"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.university_id}
                        onChange={(e) =>
                            setData("university_id", e.target.value)
                        }
                        required
                    >
                        <option value=""> Select University</option>
                        {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>
                                {uni.name}
                            </option>
                        ))}
                    </select>
                    <InputError
                        message={errors.university_id}
                        className="mt-2"
                    />
                </div>

                {/* --- ডিপার্টমেন্ট ড্রপডাউন --- */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="department_id"
                        value="Select Department"
                    />
                    <select
                        id="department_id"
                        disabled={!departments.length}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm disabled:bg-gray-100"
                        value={data.department_id}
                        onChange={(e) =>
                            setData("department_id", e.target.value)
                        }
                    >
                        <option value=""> Select Department </option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name} ({dept.short_name})
                            </option>
                        ))}
                    </select>
                    <InputError
                        message={errors.department_id}
                        className="mt-2"
                    />
                </div>

                {/* --- সেশন ড্রপডাউন --- */}
                <div className="mt-4">
                    <InputLabel htmlFor="session_id" value="Select Session" />
                    <select
                        id="session_id"
                        disabled={!sessions.length}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm disabled:bg-gray-100"
                        value={data.session_id}
                        onChange={(e) => setData("session_id", e.target.value)}
                    >
                        <option value=""> Select Session </option>
                        {sessions.map((sess) => (
                            <option key={sess.id} value={sess.id}>
                                {sess.session}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.session_id} className="mt-2" />
                </div>

                {/* Password Fields */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
