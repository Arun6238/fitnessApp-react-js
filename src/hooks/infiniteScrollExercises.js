import { useEffect, useRef, useState } from "react"
import { useAuthenticatedFetch } from "./api"
import useExerciseFilter from "./exerciseFilter"

const useInfiniteScrollExercises = () => {
    const authenticatedFetch = useAuthenticatedFetch()
    const [componentLoading,setComponentLoading] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [exercises,setExercises] = useState([])
    const hasNext = useRef(true)
    const next = useRef("")
    const {filter,selectBodyPart,selectCategory,selectName} = useExerciseFilter()

    const mergeExercises = (exercises) => {
        setExercises(state =>{
            return [...state,...exercises]
        })
    }
    const fetchData = (callback = setExercises) =>{
        setIsLoading(true)
        if(hasNext.current){
        const url =`exercise/exercise-list/?next=${next.current}&name=${filter.name}&category=${filter.category}&body_part=${filter.body_part}`
        authenticatedFetch(url)
        .then(data => {
            if(data.status === 200){
                // set component loading to false when page is initialy loaded
                if(componentLoading){
                    setComponentLoading(false)
                }
                callback(data.data.exercise)
                hasNext.current = data.data.has_next
                next.current = data.data.next
            }
            else if(data.status === 500){
                console.log("internal server error")
            }
            else{
                console.log("some thing went wrong")
            }
        })
        .catch((error)=> {
            console.error('some thing went wrong',error)
        })
        .finally(()=>{
            setIsLoading(false)
        })}
    }
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 2 <= document.documentElement.offsetHeight || isLoading) {
          return;
        }
        // mergeExercise is passed as callback to merge the new fetch data with previous state
        fetchData(mergeExercises);
    };
    const onFilterChange = () => {

    }
    useEffect( ()=>{
        fetchData()
    },[])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]);
      useEffect(()=>{
        // set has next and next to true and empty string every time the filter is updated
        hasNext.current = true
        next.current = ""
        // fetch the exercise list with  new filters applied
        fetchData()
    },[filter])

    return {exercises,componentLoading,filter,selectBodyPart,selectCategory,selectName}
}

export default useInfiniteScrollExercises