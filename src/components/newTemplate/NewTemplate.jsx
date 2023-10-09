import "./newTemplate.css"
import debounce from "../../utils/debounce"
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { ExerciseCard } from "../sharedComponents/ExerciseCard"
import { Outlet } from "react-router-dom"

const NewTemplate = () => {
	const [template,setTemplate] = useState({
        name:"",
        exercises:[],
        uniqueExercises:{}
    })
    const [hide,setHide] = useState(false)
    const navigate=useNavigate()
    const toggleParent = () => {
        setHide((state)=>!state)
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
                exercises:[...state.exercises,exercise],
                uniqueExercises:{...state.uniqueExercises,[key]:""}
            }
        })
    }
    const  addExercises = () => {
        navigate("/add-new-template/add-exercise")
    }
    const  setTemplateName = debounce((e) => {
        setTemplate((state) =>({...state,name:e.target.value}))
    },400)

  return <>
    {hide?null:<NewTemplateUi 
        setTemplateName={setTemplateName} 
        addExercises={addExercises} 
        template={template}
    />}
    <Outlet context={[toggleParent,pushExercise,isExerciseSelected]}/>
  </>
}

const NewTemplateUi = ({template,setTemplateName,addExercises}) => {
    return <div className="new-template-container">
    <header>
        <h4>new workout template</h4>
        <button className="save-button">Save</button>
    </header>
    <hr />
    {template.name}
    <div className="new-template-content">
        <input 
            onChange={setTemplateName}
            className="template-name" 
            type="text" 
            placeholder="Enter your template's name"
        />
        <div>
            {template.exercises.map((item) => <ExerciseCard key={item.id + item.name} exercise={item}/>)}
        </div>
        <button onClick={addExercises} className="add-exercise">ADD EXERCISE</button>
    </div>
</div>
}
export default NewTemplate