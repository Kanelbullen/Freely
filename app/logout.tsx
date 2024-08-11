import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>LiveBox</title>
            </head>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
