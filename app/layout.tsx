import ClientSessionProvider from './components/ClientSessionProvider';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Freely</title>
            </head>
            <body>
                <ClientSessionProvider>
                    <Navbar />
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
}
