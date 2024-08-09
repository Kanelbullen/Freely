'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form(){
    const router = useRouter();
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                password2: formData.get('password2'),
            }),
        });
        console.log({ response });
        
    };
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <form onSubmit={handleSumbit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label htmlFor="username">Username</label>
            <input name="username" className="border border-black text-black" type="text" placeholder="Username"/>
            <label htmlFor="username">Email</label>
            <input name="email" className="border border-black text-black" type="email" placeholder="Email"/>
            <label htmlFor="password">Password</label>
            <input name="password" className="border border-black text-black" type={passwordVisible ? 'text' : 'password'} placeholder="Password"/>
            <button type="button" onClick={togglePasswordVisibility}> {passwordVisible ? 'Hide' : 'Show'} </button>
            <label htmlFor="username">Re-enter Password</label>
            <input name="password2" className="border border-black text-black" type="password" placeholder="Password"/>
            <button type="submit">Register</button>
        </form>
    );
}