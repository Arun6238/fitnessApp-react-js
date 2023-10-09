import './workout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuthenticatedFetch } from "../../hooks/api"
import { useEffect, useState } from 'react'

const Workout = () => {
    const [templates,setTemplates] = useState([])
    const [IsRendered,setIsRendered] = useState(false)
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const startEmptyWorkout = async () => {
        const url = "exercise/start-new-training-session/";
        const postData = {
            name:"first session"
         };
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData), // Convert the data to JSON format
          }
        const {data,status} = await fetch(url,options)
        if(status >= 200  || status<=299){
            console.log("success")
            console.log(data)
        }
        else{
            console.log(data)
        }
        navigate("/ongoing-workout")
    }
    const addNewTemplate = () => {
        navigate('/add-new-template')
    }
    useEffect(() => {
        try{
            // get all the templates
            const fetchData = async () => {
                const {data , status} = await fetch("exercise/get_all_templates/")
                if (status === 200){
                    setTemplates(data.data)
                }
                else{
                    // replace this with proper error handling
                    console.log("error",data.error)
                }
            }
            fetchData()
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsRendered(true)
        }
    },[])
    return (
        <div className='workout-container'>
            <h2>Workout</h2>
            <div className='start-empty-workout'>
                <h6>QUICK START</h6>
                <button onClick={startEmptyWorkout}>START AN EMPTY WORKOUT</button>
            </div>
            <div className='my-templates'>
                <div className='add-template-container'>
                    <h6>MY TEMPLATES</h6>
                    <button className='add-template-button' onClick={addNewTemplate}>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
                {IsRendered?
                    templates.map(item => <TemplateCard 
                                                key={item.id} 
                                                name={item.name}  
                                                exercises={item.exercises}
                                            />)
                    :"loading..."
                }
            </div>
        </div>
    )
}

export default Workout

const TemplateCard = ({name="",exercises=[]}) => {
    return(
        <div className='exercise-template-card'>
            <div className='exercise-template-card-section-1'>
                <h3>{name}</h3>
                <button ><FontAwesomeIcon icon={faEllipsisV}/></button>
            </div>
            {exercises.map(item => <p key={item.id}>{item.sets} x {item.name} </p>)}
        </div>
    )
}