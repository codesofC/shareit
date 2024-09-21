"use client"

import { useSession } from "next-auth/react"
import FormContainer from "@/components/FormContainer"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const NewProject = () => {

  const { data: session } = useSession()

  const router = useRouter()

  useEffect(() => {
    if(!session){
      router.push("/")
    }
  }, [])

  return session && (
    <div className="px-4 sm:px-12 xl:px-40 2xl:px-96">
      <FormContainer />
    </div>
  )
}

export default NewProject