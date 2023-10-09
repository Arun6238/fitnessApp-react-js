import "./exercise.css"
import {ExerciseCard, ExerciseCardSkeleton} from "../sharedComponents/ExerciseCard"
import { Filter } from "../sharedComponents/Filter"
import { useNavigate } from "react-router-dom"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useInfiniteScrollExercises from "../../hooks/infiniteScrollExercises"
const Exercises = () => {
    const navigate = useNavigate()
    const {exercises,componentLoading,filter,selectBodyPart,selectCategory,selectName} = useInfiniteScrollExercises()
    const onSelect  = ({id,name,is_custom})=>{
        navigate(`/exercise/${id}/${name}/${is_custom}`)
    }
    return (
        <div className="exercises-container">
            <h2>Exercises</h2>
            <Filter selectName={selectName}
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
                            onClick={()=>{onSelect(exercise)}}
                        />
                ))
                ):( componentLoading||<p>no results</p>)
            }
            {/* render skeleton loader when component is initialy loaded */}
            {componentLoading && (Array.from({ length: 10 }).map((_, index) => {
                        return <ExerciseCardSkeleton key={index} />;
                    })
            )}
        </div>
    );
}

const SelectedFilters = ({body_part,category,selectBodyPart,selectCategory}) => {
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

