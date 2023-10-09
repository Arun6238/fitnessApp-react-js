import { useState } from "react";
import debounce from "../utils/debounce";

const useDebouncedState = (initState="",delay=1000) => {
    const [state,setState] = useState(
        typeof initState === "function" ?
            initState() :
            initState
        )
    const setDebouncedState = debounce((value)=>{
        if(typeof value === "function"){
            const newValue = value()
            setState(newValue)
        }
        else{
            setState(value)
        }
    },delay)
    return [state,setDebouncedState]
} 

export default useDebouncedState