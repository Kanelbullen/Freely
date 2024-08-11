// 'use client';

// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";

// export default function Form(){
//     const router = useRouter();
//     const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const response = await fetch('/api/auth/register', {
//             method: 'POST',
//             body: JSON.stringify({
//                 username: formData.get('username'),
//                 email: formData.get('email'),
//                 password: formData.get('password'),
//                 password2: formData.get('password2'),
//             }),
//         });
//         console.log({ response });
        
//     };
//     const [passwordVisible, setPasswordVisible] = useState(false);
    
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };
//     return (
//         <form onSubmit={handleSumbit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
//             <label htmlFor="username">Username</label>
//             <input name="username" className="border border-black text-black" type="text" placeholder="Username"/>
//             <label htmlFor="username">Email</label>
//             <input name="email" className="border border-black text-black" type="email" placeholder="Email"/>
//             <label htmlFor="password">Password</label>
//             <input name="password" className="border border-black text-black" type={passwordVisible ? 'text' : 'password'} placeholder="Password"/>
//             <button type="button" onClick={togglePasswordVisibility}> {passwordVisible ? 'Hide' : 'Show'} </button>
//             <label htmlFor="username">Re-enter Password</label>
//             <input name="password2" className="border border-black text-black" type="password" placeholder="Password"/>
//             <button type="submit">Register</button>
//         </form>
//     );
// }

// 'use client';

// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";

// export default function Form() {
//     const router = useRouter();
//     const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const response = await fetch('/api/auth/register', {
//             method: 'POST',
//             body: JSON.stringify({
//                 username: formData.get('username'),
//                 email: formData.get('email'),
//                 password: formData.get('password'),
//                 password2: formData.get('password2'),
//             }),
//         });
//         console.log({ response });
        
//     };

//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     return (
//         <form onSubmit={handleSumbit} className="flex flex-col gap-4">
//             <div>
//                 <label htmlFor="username" className="block text-sm font-medium mb-2">
//                     Username
//                 </label>
//                 <input
//                     name="username"
//                     className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
//                     type="text"
//                     placeholder="Username"
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-2">
//                     Email
//                 </label>
//                 <input
//                     name="email"
//                     className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
//                     type="email"
//                     placeholder="Email"
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password" className="block text-sm font-medium mb-2">
//                     Password
//                 </label>
//                 <input
//                     name="password"
//                     className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
//                     type={passwordVisible ? 'text' : 'password'}
//                     placeholder="Password"
//                     required
//                 />
//                 <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="mt-2 text-sm text-blue-400 hover:underline"
//                 >
//                     {passwordVisible ? 'Hide' : 'Show'} Password
//                 </button>
//             </div>
//             <div>
//                 <label htmlFor="password2" className="block text-sm font-medium mb-2">
//                     Re-enter Password
//                 </label>
//                 <input
//                     name="password2"
//                     className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
//                     type="password"
//                     placeholder="Re-enter Password"
//                     required
//                 />
//             </div>
//             <button
//                 type="submit"
//                 className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-semibold"
//             >
//                 Register
//             </button>
//         </form>
//     );
// }

// New try

'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
    const router = useRouter();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            router.push("/profile");
            router.refresh;
        } else {
            console.error(result.message);
            setErrors({ [result.field]: result.message });
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

