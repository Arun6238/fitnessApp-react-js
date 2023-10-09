import { useState } from "react";
import toast from "react-hot-toast";

export const useToast = () => {
    const [id,setId] = useState(null)
    const removeToast = () => {
        if(id !== null){
            toast.remove(id)
        }
    }
    const successToast = (message) => {
        removeToast()
        const newId = toast.success(message)
        setId(newId)
    }
    const errorToast = (message) => {
        removeToast()
        const newId = toast.error(message)
        setId(newId)
    }

    return {successToast,errorToast}
}
