// import { getServerSession } from 'next-auth';
// import Form from './form'
// import { redirect } from 'next/navigation';

// export default async function RegisterPage(){
//     const session =  await getServerSession();
//     if(session){
//         redirect("/")
//     }
//     return <Form />;

// }
import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold text-center mb-8">Sign Up</h2>
                <Form />
            </div>
        </div>
    );
}
