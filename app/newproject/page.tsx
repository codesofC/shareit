"use client"

import { signIn, useSession } from "next-auth/react"
import FormContainer from "@/components/FormContainer"

const NewProject = () => {

    const { data: session } = useSession()



    if(!session){
        return signIn()
    }

  return (
    <div className="px-6 sm:px-24 md:px-48 xl:px-96 2xl:px-[30%]">
      <FormContainer />
    </div>
  )
}

export default NewProject