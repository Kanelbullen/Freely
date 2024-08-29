'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
    const router = useRouter();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/auth/register', {  // Corrected the API endpoint
                method: 'POST', // Changed to 'POST'
                body: JSON.stringify({
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    password2: formData.get('password2'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle successful response
                const result = await response.json(); // Parsing the response JSON
                router.push(result.redirectUrl); // Redirecting based on the server response
                router.refresh(); // Refreshing the router if needed
            } else {
                const errorResult = await response.json(); // Parsing error response
                console.error(errorResult.message);
                setErrors({ [errorResult.field]: errorResult.message });
            }
        } catch (error) {
            console.error('Failed to register:', error);
            setErrors({ general: 'Something went wrong. Please try again.' });
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={handleSumbit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label htmlFor="username">Username</label>
            <input
                name="username"
                className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500  ${errors.username ? 'border-red-500' : 'border-black'}`}
                type="text"
                placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            <label htmlFor="email">Email</label>
            <input
                name="email"
                className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-black'}`}
                type="email"
                placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
                name="password"
                className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-black'}`}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
            />
            <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <label htmlFor="password2">Re-enter Password</label>
            <input
                name="password2"
                className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-black'}`}
                type="password"
                placeholder="Re-enter Password"
            />

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4">Register</button>
        </form>
    );
}