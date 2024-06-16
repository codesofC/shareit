"use client"

import { CustomButtonProps } from '@/types/index'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'


const CustomButton = ({ title, type, customStyles, handleEvent }: CustomButtonProps) => {
  return (
    <Button
        type={type || "button"}
        onClick={handleEvent}
        className={cn("bg-transparent py-2", customStyles)}
        aria-label={title}
    >
        { title }
    </Button>
  )
}

export default CustomButton