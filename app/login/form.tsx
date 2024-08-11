
'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
    const router = useRouter();
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        if (!response?.error) {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSumbit} className="flex flex-col gap-4">
            <input
                name="email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                placeholder="Email"
                required
            />
            <input
                name="password"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Password"
                required
            />
            <button
                type="submit"
                className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-semibold"
            >
                Login
            </button>
        </form>
    );
}
