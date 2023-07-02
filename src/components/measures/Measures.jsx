import { useEffect, useRef } from "react"
import "./measures.css"
const Measures = () => {

    const stickyRef = useRef(null);
    useEffect(()=>{
        const handleScroll = () => {
            const stickyHeading = stickyRef.current;
            const stickingPositon = stickyHeading.getBoundingClientRect().top;

            if(stickingPositon<= 0){
                stickyHeading.classList.add('reached-top')
            }
            else{
                stickyHeading.classList.remove('reached-top')
            }
        }

        window.addEventListener('scroll',handleScroll);
        return ()=> {
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);

    const measure = {
        core:[ 
        "Weight",
        "Body fat percentage",
        "Caloric"
        ],
        "body part":[
            "Neck",
            "Shoulders",
            "Chest",
            "Left bicep",
            "Right bicep",
            "Left forearm",
            "Right forearm",
            "Upper abbs",
            "Waist",
            "Lower abs",
            "Hips",
            "Left thigh",
            "Right thigh",
            "Left calf",
            "Right calf"
        ]
    }
    return(
        <>
            <div className="measures-container">
                <h2 ref={stickyRef}>Measures </h2>
                <h5>core</h5>
                <ul className="measure-list">
                    {measure.core.map(item => {
                        return (<li key={item}>{item}</li>)
                    })}
                </ul>
                <h5>Body Part</h5>
                <ul className="measure-list">
                    {measure["body part"].map(item => {
                        return(
                            <li key={item}>{item}</li>
                        )
                    })
                    }
                </ul>
            </div>
        </>
    )
} 

export default Measures