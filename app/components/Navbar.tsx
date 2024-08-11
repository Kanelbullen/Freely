'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Render nothing on the server to avoid mismatch
    }

    return (
        <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">LiveBox</Link>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link>
                    {status === 'authenticated' ? (
                        <>
                            <Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                            <button onClick={() => signOut()} className="text-gray-300 hover:text-white">Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white">Sign In</Link>
                            <Link href="/register" className="text-gray-300 hover:text-white">Sign Up</Link>
                        </>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <Link href="/" className="block px-4 py-2 text-gray-300 hover:text-white">Home</Link>
                    <Link href="/categories" className="block px-4 py-2 text-gray-300 hover:text-white">Categories</Link>
                    {status === 'authenticated' ? (
                        <>
                            <Link href="/profile" className="block px-4 py-2 text-gray-300 hover:text-white">Profile</Link>
                            <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white">Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block px-4 py-2 text-gray-300 hover:text-white">Sign In</Link>
                            <Link href="/signup" className="block px-4 py-2 text-gray-300 hover:text-white">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
