const bcrypt = require('bcrypt');
import prisma from '@/app/api/prisma'
import { NextResponse } from "next/server"

export async function POST(request:any) { 
    const body = await request.json()
    const {email, password, repeatPassword } = body

    if(!email || !password || !repeatPassword){
        return new NextResponse("Missing Name, Email or Password", {status: 400});
    }
    if( password != repeatPassword){
        return new NextResponse("Passwords Dont match", {status: 400});
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exist){
        return new NextResponse("User allready exists", {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, process.env.NEXTAUTH_SECRET )

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    return NextResponse.json(user)
}