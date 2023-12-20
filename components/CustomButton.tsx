"use client"

import { CustomButtonProps } from '@/types/index'
import React from 'react'
import {signIn} from "next-auth/react"


const CustomButton = ({ title, type, customStyles, handleEvent }: CustomButtonProps) => {
  return (
    <button
        type={type || "button"}
        onClick={handleEvent}
        className={`custom-button ${customStyles}`}
        aria-label={title}
    >
        { title }
    </button>
  )
}

export default CustomButton