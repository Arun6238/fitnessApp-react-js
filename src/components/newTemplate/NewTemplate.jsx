import "./newTemplate.css"
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { Outlet } from "react-router-dom"
import { useToast } from "../../hooks/useToast"
import {useAuthenticatedFetch} from "../../hooks/api"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faClose} from "@fortawesome/free-solid-svg-icons"
const NewTemplate = () => {
	const [template,setTemplate] = useState({
        name:"",
        exercises:[],
        uniqueExercises:{}
    })
    const [hide,setHide] = useState(false)
    const navigate=useNavigate()
    const fetch =useAuthenticatedFetch()
    const {errorToast} =useToast()
    const toggleParent = () => {
        setHide((state)=>!state)
    }
    const addSet = (index)=> {
        const exercices = [...template.exercises]
        exercices[index] = {...exercices[index],sets:exercices[index].sets + 1}
        setTemplate({...template,exercises:exercices})
    }
    const removeSet = (index) => {
        const exercices = [...template.exercises]
        exercices[index] = {...exercices[index],sets:exercices[index].sets >1 && exercices[index].sets - 1}
        setTemplate({...template,exercises:exercices})
    }
    const removeExercise = (index) => {
        const exercises = [...template.exercises]
        const exercise = exercises[index]
        const key = String(exercise.is_custom) + exercise.id
        const uniqueExercises = delete {...template.uniqueExercises}[key]
        exercises.splice(index,1)
        setTemplate({...template,exercises,uniqueExercises})

    }
    const isExerciseSelected = (exercise) => {
        const key = String(exercise.is_custom) + exercise.id
        if(template.uniqueExercises.hasOwnProperty(key)){
            return true
        }
        return false
    }
    
    const pushExercise = (exercise) => {
        const key = String(exercise.is_custom) + exercise.id
        setTemplate(state => {
            return {
                ...state,
                exercises:[...state.exercises,{exercise,sets:1}],
                uniqueExercises:{...state.uniqueExercises,[key]:""}
            }
        })
    }
    const saveTemplate = async() => {
        if(template.name === ""){
            errorToast("Enter a valid template name")
        }
        else if(template.exercises.length === 0){
            errorToast("Please select atleast one exercise")
        }
        else{
            const url ="exercise/create_new_template/"
            const options =  {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:template.name,exercises:template.exercises}),
              }
            const {data,status} = await fetch(url,options)
            if(status === 200){
                navigate('/workout',{replace:true})
            }
            console.log({name:template.name,exercices:template.exercises})
        }
    }
    const  addExercises = () => {
        navigate("/add-new-template/add-exercise")
    }
    const  setTemplateName = (e) => {
        setTemplate((state) =>({...state,name:e.target.value}))
    }

  return <>
    {hide?null:<NewTemplateUi 
        setTemplateName={setTemplateName} 
        addExercises={addExercises} 
        template={template}
        addSet={addSet}
        removeSet={removeSet}
        saveTemplate={saveTemplate}
        removeExercise={removeExercise}
    />}
    <Outlet context={[toggleParent,pushExercise,isExerciseSelected]}/>
  </>
}

const NewTemplateUi = ({template,setTemplateName,addExercises,addSet,removeSet,saveTemplate,removeExercise}) => {
    return <div className="new-template-container">
    <header>
        <h4>new workout template</h4>
        <button onClick={saveTemplate} className="save-button">Save</button>
    </header>
    <hr />
    <div className="new-template-content">
        <input 
            onChange={setTemplateName}
            value={template.name}
            className="template-name" 
            type="text" 
            placeholder="Enter your template's name"
        />
        <div>
            {template.exercises.map((item,index) => 
                <TemplateExerciseCard 
                    key={item.exercise.id + item.exercise.name} 
                    data={item} 
                    addSet={()=>{addSet(index)}}
                    removeSet={() => {removeSet(index)}}
                    removeExercise={() => {removeExercise(index)}}
                />)}
        </div>
        <button onClick={addExercises} className="add-exercise">ADD EXERCISE</button>
    </div>
</div>
}
export default NewTemplate


const TemplateExerciseCard = ({data,addSet,removeSet,removeExercise}) => {
    const {exercise,sets} = data
    const categories = {
        "Weighted bodyweight":<>
                <th>+KG</th>
                <th>REPS</th>
            </>,
        "Assisted body":<>
                <th>-KG</th>
                <th>REPS</th>
            </>,
        "Reps only":<>
                <th>REPS</th>
            </>,
        "Cardio exercice":<>
                <th>KM</th>
                <th>TIME</th>
            </>,
        "Duration":<>
                <th>REPS</th>
            </>,
    }
    return(
        <div className="template-exercise-card-table-container">  
            <div className="template-exercise-card-header">
                <h4>{exercise.name}</h4>
                <button onClick={removeExercise}><FontAwesomeIcon icon={faClose}/></button>
            </div>
            <table className="template-exercise-card-table">
                <thead>
                    <tr>
                        <th>SET</th>
                        <th>PREVIOUS</th>
                        {categories[exercise.category]||<><th>KG</th><th>REPS</th></>}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({length:sets}).map((_,index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>-</td>
                            <td><input type="text" /></td>
                            <td><input type="text" /></td>
                            {(index!==0 && index+1===sets) && 
                                <td><button onClick={removeSet}>remove</button></td>
                            }
                        </tr>
                    })}
                </tbody>

            </table>
            <button className="template-exercise-card-add-set" onClick={addSet}>ADD SET</button>
        </div>
    )
}

