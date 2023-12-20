"use client"

import { createContext, useContext, useState } from "react"
import SkeletonCard from "./SkeletonCard"
import { Skeleton } from "./ui/skeleton"


const Loading = () => {

    const falseArray = new Array(10).fill("")

  return (
    <>
    <div className="flex-center flex-col gap-5 my-24">
        <Skeleton className="w-[500px] h-10" />
        <Skeleton className="w-[250px] h-5" />
      </div>
    <div className="projects-user-container px-4 md:px-8 lg:px-12 xl:px-24">
        {falseArray.map((i, index) => (
            <SkeletonCard key={index}/>
        ))}
    </div>
    </>
  )
}

export default Loading

export const contextLoad = createContext({})

export const LoadingContext = ({ children }: { children: React.ReactNode}) => {

    const [isLoading, setIsLoading] = useState(true)


    return (
        <contextLoad.Provider value={{isLoading, setIsLoading}}>
            { children }
        </contextLoad.Provider>
    )
}

export const useLoadingContext = () => {

    const context = useContext(contextLoad)

    if(!context){
        throw new Error("useFirebase must be used within a FirebaseContext")
    }

    return context
}