import "./exercise.css"
import { useAuthenticatedFetch } from "../../hooks/api"
import {ExerciseCard} from "../commmonChildren/ExerciseCard"
import { useEffect, useState, useRef } from "react"
import debounce from "../../utils/debounce"
import { Filter } from "../commmonChildren/Filter"
import { useNavigate } from "react-router-dom"

const Exercises = () => {
    const authenticatedFetch = useAuthenticatedFetch()
    const [componentLoading,setComponentLoading] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [exercises,setExercises] = useState([])
    const hasNext = useRef(true)
    const next = useRef("")
    const [filter,setFilter] = useState({
        name:"",
        body_part:"",
        category:""
    })
    const navigate = useNavigate()
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
    const mergeExercises = (exercises) => {
        setExercises(state =>{
            return [...state,...exercises]
        })
    }
    const fetchData = (callback) =>{
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
                console.log(data.data.exercise)
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
    const debouncedFilterName = debounce(e => {
        setFilter(state => {
            return {...state,name:e.target.value}
        })
    },500)
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 2 <= document.documentElement.offsetHeight || isLoading) {
          return;
        }
        fetchData(mergeExercises);
    };

    useEffect( ()=>{
        fetchData(setExercises)
    },[])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]);

    useEffect(()=>{
            // set has next and next to true and empty string every time the filter is updated
            hasNext.current = true
            next.current = ""
            fetchData(setExercises)
    },[filter])
    return (
        <div className="exercises-container">
            <Filter changeName={debouncedFilterName}
                    body_part={filter.body_part}
                    category={filter.category}
                    selectBodyPart={selectBodyPart}
                    selectCategory={selectCategory}
            />
            <h2>Exercises</h2>
            <hr />
            <div>
                {/* shows the selected filters if any */}
                {filter.body_part &&
                    <span className="exercises-applied-filter">
                        {filter.body_part} 
                        <button onClick={()=>{selectBodyPart("")}}>x</button>
                    </span>}
                {filter.category &&
                    <span className="exercises-applied-filter">
                        {filter.category} 
                        <button onClick={()=>{selectCategory("")}}>x</button>
                    </span>
                }
            </div>
            
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                        <ExerciseCard 
                            key={exercise.id + exercise.name}  
                            exercise={exercise} 
                            onClick={()=>{
                                navigate(`/exercise/${exercise.id}/name/${exercise.name}/isCustom/${exercise.is_custom}`)
                            }}/>
                ))
                ):( componentLoading||<p>no results</p>)
            }
            {/* render skeleton loader when component is initialy loaded */}
            {componentLoading && (Array.from({ length: 10 }).map((_, index) => {
                        return <ExerciseCard key={index} />;
                    })
            )}
        </div>
    );
}

export default Exercises

