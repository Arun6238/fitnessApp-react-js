import "./addExercise.css"
import { useOutletContext } from "react-router-dom"
import { useEffect} from "react"
import { ExerciseCardSelect } from "../../sharedComponents/ExerciseCard"
import useInfiniteScrollExercises from "../../../hooks/infiniteScrollExercises"
import {FilterSearch} from "../../sharedComponents/Filter"
import {Toaster} from "react-hot-toast"
import { useToast } from "../../../hooks/useToast"


const AddExercise = () => {
    const [toggleParent,pushExercise,isExerciseSelected] = useOutletContext()
    const {errorToast,successToast} = useToast()
    useEffect(()=>{
        toggleParent()
        return()=>toggleParent()
    },[])
    const onSelect  = (exercise)=>{
            successToast(`${exercise.name} is added`)
            pushExercise(exercise)
    }
    return (
        <div className="add-exercise-container">
            <h2 className="add-exercise-title">Add exercise</h2>
            <ExerciseList 
                onSelect={onSelect}
                isSelected={isExerciseSelected}
                errorToast ={errorToast}
            />
            <Toaster
                position="bottom-center"
                toastOptions={{duration:2000}}
            />
        </div>
        
    )
}

export default AddExercise

const ExerciseList = ({onSelect,isSelected,errorToast}) => {
    const {exercises,selectName} = useInfiniteScrollExercises()
    return (
        <div>
            <FilterSearch selectName={selectName}/>
            <div style={{marginTop:"10px"}}>
                {exercises.map((exercise) => (
                    <ExerciseCardSelect
                        key={exercise.id + exercise.name}  
                        exercise={exercise} 
                        onClick={onSelect}
                        isSelected = {isSelected}
                        errorToast={errorToast}
                    />
                ))}
            </div>
        </div>
    )
}
 