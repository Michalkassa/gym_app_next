'use client'
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation"
//import {signIn} from "next-auth/react"
import {SignIn} from "@/app/api/auth/actions"
import { useFormState} from "react-dom";
import Image from "next/image";
import Loading from "./Loading";

const initialState = {
    message: '',
}

export default function LoginForm() { 
    const router = useRouter()
    const [state, formAction] = useFormState(SignIn, initialState)
    const [loading, setLoadingState] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        setLoadingState(false)
      }, [state])

    return (
        <section className="bg:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="../" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <Image className="w-8 h-8 mr-2" src="/logo.png" alt="logo" width={45} height={30}/>
          Tennis Club Atlantis
      </a>
      <div className="w-full rounded-lg shadow  border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action={formAction} onSubmit={() => setLoadingState(true)}>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                      <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-white ">Password</label>
                      <input type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  {loading || <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 hover:bg-white hover:text-black">Sign in</button>}
                  {loading && <Loading/>}
                  <p className="text-sm font-light text-gray-500">
                      Don’t have an account ? <br></br><a href="/register" className="font-medium hover:underline text-primary-500">Sign Up</a>
                  </p>
                  <p className="text-red-600">
                    {state?.message}
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}