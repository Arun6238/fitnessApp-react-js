import { useState } from "react"
import debounce from "../utils/debounce"

const useExerciseFilter = () => {
    const [filter,setFilter] = useState({
        name:"",
        body_part:"",
        category:""
    })
    // funtion to set filter category
    const selectCategory = (value) => {
        // if value changed update the state
        if(value === filter.category) return
        setFilter(state => {
            return {...state,category:value}
        })
    }
    // function to set filter body_part
    const selectBodyPart = (value) => {
        // if value changed update the state
        if(value === filter.body_part) return
        setFilter(state => {
            return {...state,body_part:value}
        })
    }
    const selectName = debounce(e => {
        setFilter(state => {
            return {...state,name:e.target.value}
        })
    },500)

    return {filter,selectBodyPart,selectCategory,selectName}
}

export default useExerciseFilter