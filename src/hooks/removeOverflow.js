import { useEffect } from "react"

const useRemoveOverflow = () => {
    useEffect(()=>{
        document.body.style.overflowY = "hidden"
        return () => document.body.style.overflowY = "visible"
    },[])
}

export default useRemoveOverflow