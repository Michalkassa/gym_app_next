import {useState} from "react";
import {redirect} from "next/navigation"
import {auth} from "@/app/api/auth/auth"
//import {signIn} from "next-auth/react"
import RegisterForm from "@/components/RegisterForm";


export default async function RegisterPage() { 
    const session = await auth()
    if(session){
        redirect("/dashboard")
    }

    return (
        <div>
            <RegisterForm/>
        </div>
    )
}