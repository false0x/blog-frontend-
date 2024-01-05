import { toast } from "react-toastify"
import { errorCatch } from '@/src/api/api.helper'

export const toastError = (error: any) => {
    const message = errorCatch(error)

    console.log(message)

    toast.error(message)

    throw message
}