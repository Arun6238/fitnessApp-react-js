import { useState } from "react"

const useToggle = (initState = false) => {
    const [isVisible,setIsVisible] = useState(initState)

    const toggle = () => {
        setIsVisible(state => !state)
    }

    return [isVisible,toggle]
}

export default useToggle