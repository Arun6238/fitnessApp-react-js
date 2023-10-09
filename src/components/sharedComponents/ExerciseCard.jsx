import {LazyLoadImage} from "react-lazy-load-image-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./exerciseCard.css"
import { useState } from "react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export const ExerciseCard = ({exercise,onClick}) => {
    const [loading,setLoading] = useState(true)
    const isCustom = exercise.is_custom
    return (
        <div className="exercise-card" onClick={onClick}>
            <ExerciseCardSection1 
                name={exercise.name}
                image={exercise.image}
                loading={loading}
                isCustom={isCustom}
                onLoad={setLoading}
            />
            <ExerciseCardSection2
                name={exercise.name}
                body_part={exercise.body_part}
            />
        </div>
    );
};


export const ExerciseCardSelect = ({exercise,onClick,isSelected,errorToast}) => {
    const [loading,setLoading] = useState(true)
    const [hide,setHide] = useState(false)
    const isCustom = exercise.is_custom
    const handleClick =() =>{
        if(isSelected(exercise)){
            errorToast(`${exercise.name} is already selected`)
        }
        else{
            onClick(exercise)
            setHide(true)
        }
    }
    // hide the component when the hide state is false
    if(hide){
        return null
    }
    return (
        <div className="exercise-card">
            <ExerciseCardSection1 
                name={exercise.name}
                image={exercise.image}
                loading={loading}
                isCustom={isCustom}
                onLoad={setLoading}
            />
            <ExerciseCardSection2
                name={exercise.name}
                body_part={exercise.body_part}
            />
            <div className="section-3">
                <button onClick={handleClick}><FontAwesomeIcon icon={faAdd}/></button>
            </div>
        </div>
    );
};

const ExerciseCardSection1 = ({name,image,loading,isCustom,onLoad}) => {
    return (
        <div className="section-1">
            {loading?
                <div className="placeholder">
                    {name[0]}
                </div>:
                null
            }
            {isCustom?
                null:
                <LazyLoadImage
                    src={image}
                    alt={`${name} image`}
                    onLoad={()=>{
                        onLoad(false)
                    }}
                />
            }
        </div>
    )
}
const ExerciseCardSection2 = ({name,body_part}) => {
    return (
        <div className="section-2">
            <span className="exercise-name">
                {name}
            </span>
            <span className="exercise-bodypart">
                {body_part}
            </span>
        </div>
    )
}

export const ExerciseCardSkeleton  = () => {
   return <div className="exercise-card">
        <div className="section-1 skeleton"></div>
        <div className="section-2">
            <span className="exercise-name skeleton skeleton-text"></span>
            <span className="exercise-bodypart skeleton skeleton-text"></span>
        </div>
    </div>
}