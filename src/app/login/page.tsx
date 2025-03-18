import {useState} from "react";
import {redirect} from "next/navigation"
import {auth} from "@/app/api/auth/auth"
//import {signIn} from "next-auth/react"
import {SignIn} from "@/app/api/auth/actions"
import LoginForm from "@/components/LoginForm";


export default async function LoginPage() { 
    const session = await auth()
    if(session){
        redirect("/dashboard")
    }

    return (
        <div >
            <LoginForm/>
        </div>
    )
}