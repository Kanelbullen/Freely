'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form(){
    const router = useRouter();
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        console.log(response);
        if(!response?.error){
            router.push("/");
            router.refresh();
        }
    };
    return (
        <form onSubmit={handleSumbit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input name="email" className="border border-black text-black" type="email" placeholder="Email"/>
            <input name="password" className="border border-black text-black" type="password" placeholder="Password"/>
            <button type="submit">Login</button>
        </form>
    );
}