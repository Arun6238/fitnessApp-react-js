import {LazyLoadImage} from "react-lazy-load-image-component"
import "./exerciseCard.css"
import { useState } from "react";

export const ExerciseCard = ({ exercise,onClick}) => {
    const [loading,setLoading] = useState(true)
    if (exercise != null) {
        const isCustom = exercise.is_custom
        return (
            <div className="exercise-card" onClick={onClick}>
                <div className="section-1">
                    {loading?
                        <div className="placeholder">
                            {exercise.name[0]}
                        </div>:
                        null
                    }
                    {isCustom?
                        null:
                        <LazyLoadImage
                            src={exercise.image}
                            alt={`${exercise.name} image`}
                            onLoad={()=>{
                                setLoading(false)
                            }}
                        />
                    }
                </div>
                <div className="section-2">
                    <span className="exercise-name">
                        {exercise.name}
                    </span>
                    <span className="exercise-bodypart">
                        {exercise.body_part}
                    </span>
                </div>
            </div>
        );
    }else {
        return <ExerciseCardSkeleton/>;
    }
};

const ExerciseCardSkeleton  = () => {
   return <div className="exercise-card">
        <div className="section-1 skeleton"></div>
        <div className="section-2">
            <span className="exercise-name skeleton skeleton-text"></span>
            <span className="exercise-bodypart skeleton skeleton-text"></span>
        </div>
    </div>
}