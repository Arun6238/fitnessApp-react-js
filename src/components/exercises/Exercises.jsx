import "./exercise.css"
import { useAuthenticatedFetch } from "../../hooks/api"
import {ExerciseCard} from "../commmonChildren/ExerciseCard"
import { useEffect, useState, useRef } from "react"
import debounce from "../../utils/debounce"
import { Filter } from "../commmonChildren/Filter"
import { useNavigate } from "react-router-dom"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Exercises = () => {
    const navigate = useNavigate()
    const onSelect  = ({id,name,is_custom})=>{
        navigate(`/exercise/${id}/${name}/${is_custom}`)
    }
    return <ExerciseList selectExercise={onSelect} />
}
export const ExerciseList = ({selectExercise}) => {
    const authenticatedFetch = useAuthenticatedFetch()
    const [componentLoading,setComponentLoading] = useState(true)
    // isLoading is used inside authencticatedFetch function
    const [isLoading,setIsLoading] = useState(false)
    const [exercises,setExercises] = useState([])
    const hasNext = useRef(true)
    const next = useRef("")
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
    const mergeExercises = (exercises) => {
        setExercises(state =>{
            return [...state,...exercises]
        })
    }
    // setExercises is set as the default value for the callback fuction so when callback is not explicitly porvided it will re write the existing exercise list with the new fetch data
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
    return (
        <div className="exercises-container">
            <h2>Exercises</h2>
            <Filter changeName={selectName}
                    body_part={filter.body_part}
                    category={filter.category}
                    selectBodyPart={selectBodyPart}
                    selectCategory={selectCategory}
            />
            <hr />
            <div>
                {/* shows the selected filters if any */}
                <SelectedFilters 
                    {...filter} 
                    selectBodyPart={selectBodyPart}
                    selectCategory={selectCategory}
                />
            </div>
            
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                        <ExerciseCard 
                            key={exercise.id + exercise.name}  
                            exercise={exercise} 
                            onClick={()=>{selectExercise(exercise)}}/>
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
const SelectedFilters = ({name,body_part,category,selectBodyPart,selectCategory}) => {
    return <>
        {body_part &&
            <span className="exercises-applied-filter">
                {body_part} 
                <button onClick={()=>{selectBodyPart("")}}>
                    <FontAwesomeIcon icon={faClose}/>
                </button>
            </span>}
        {category &&
            <span className="exercises-applied-filter">
                {category} 
                <button onClick={()=>{selectCategory("")}}>
                    <FontAwesomeIcon icon={faClose}/>
                </button>
            </span>}
    </>
}
export default Exercises

