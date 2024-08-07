import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request){
    try {
        const {username, email, password, password2} = await request.json();
        //Validation
        if(password == password2){
            const hasedPassword = await hash(password, 10);
            const response = await sql`
                INSERT INTO users (username, email, password)
                VALUES (${username}, ${email}, ${hasedPassword})
            `;

        }else{
            
        }
        console.log({ username, email, password, password2});


        

    }catch(e) {
        console.log({ e });
    }

    return NextResponse.json({message: 'success'});
}