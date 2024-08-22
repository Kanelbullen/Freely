'use client';

import Link from 'next/link';
import ReactPlayer from 'react-player';

const Home: React.FC = () => {
    return (
        <div className="pt-16">
            <header className="bg-gray-900 text-white py-10">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Welcome to Freely</h1>
                    <p className="mt-4">Good stuff about us very nice indeed</p>
                </div>
            </header>
            <main className="container mx-auto my-10">
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Featured Streams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sample featured streams */}
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/stream/1">
                                <ReactPlayer
                                    url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                    controls
                                    playing
                                    width="100%"
                                    height="50%"
                                    rounded="45px"
                                />
                                <h3 className="mt-2 text-xl text-white">Stream 1</h3>
                                <p className="text-gray-400">Streamer 1</p>
                            </Link>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/stream/2">
                            <ReactPlayer
                                    url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                    controls
                                    playing
                                    width="100%"
                                    height="50%"
                                    rounded="45px"
                                />
                                <h3 className="mt-2 text-xl text-white">Stream 2</h3>
                                <p className="text-gray-400">Streamer 2</p>
                            </Link>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/stream/3">
                                <ReactPlayer
                                    url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                    controls
                                    playing
                                    width="100%"
                                    height="50%"
                                    rounded="45px"
                                />
                                <h3 className="mt-2 text-xl text-white">Stream 3</h3>
                                <p className="text-gray-400">Streamer 3</p>
                            </Link>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4">Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Sample categories */}
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/category/gaming">
                                <div className="block text-center">
                                    <ReactPlayer
                                        url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                        controls
                                        playing
                                        width="100%"
                                        height="50%"
                                        rounded="45px"
                                    />
                                    <h3 className="mt-2 text-xl text-white">Gaming</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/category/music">
                                <div className="block text-center">
                                    <ReactPlayer
                                        url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                        controls
                                        playing
                                        width="100%"
                                        height="50%"
                                        rounded="45px"
                                    />
                                    <h3 className="mt-2 text-xl text-white">Music</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/category/sports">
                                <div className="block text-center">
                                    <ReactPlayer
                                        url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                        controls
                                        playing
                                        width="100%"
                                        height="50%"
                                        rounded="45px"
                                    />
                                    <h3 className="mt-2 text-xl text-white">Sports</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <Link href="/category/education">
                                <div className="block text-center">
                                    <ReactPlayer
                                        url="https://livestream.freely-streaming.com/hls/8f7964c320c934ec15c7395630669e9e.m3u8"
                                        controls
                                        playing
                                        width="100%"
                                        height="50%"
                                        rounded="45px"
                                    />
                                    <h3 className="mt-2 text-xl text-white">Education</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
