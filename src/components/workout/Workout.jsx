import './workout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuthenticatedFetch } from "../../hooks/api"
import {useEffect, useRef, useState } from 'react'
import useClickOutside from '../../hooks/clickOutside'
import {useToast} from '../../hooks/useToast'
import RenameTemplate from './renameTemplate/RenameTemplate'
import useToggle from '../../hooks/toggle'
import useTemplates from './template'
import {useRenameTemplateStore} from "./renameTemplate/renameStore"
const Workout = () => {
    const count = useRef(0)
    const setRenameTemplateData = useRenameTemplateStore(state => state.setRenameTemplateData);
    const {templates,renameTemplate,removeTemplate,addTemplates} = useTemplates()
    const [isRenameTemplateVisible,toggleRenameTemplate] = useToggle()
    const navigate = useNavigate()
    const fetch = useAuthenticatedFetch()
    const {successToast} = useToast()
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
  
    const OpenRenameTemplate = ({index, id, name}) => {
        setRenameTemplateData(index, id, name)
        toggleRenameTemplate()
    };
    const handleDelete = async (id,index) => {
        const url = `exercise/delete-template/${id}`
        const options = {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
            },
        }
        try{
            const {status} = await fetch(url,options)
            if(status === 200){
                removeTemplate(index)
                successToast("Template deleted successfully")
            }
        }
        catch(error){
            console.error("an error occured",error)
        }

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
                    addTemplates(data.data)
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
        // finally{
        //     setIsRendered(true)
        // }
    },[])
    console.log("count ---------------------- :",++count.current)
    return (
        <div className='workout-container'>
            {isRenameTemplateVisible && 
                <RenameTemplate 
                    renameLocally = {renameTemplate}
                    close={toggleRenameTemplate}
                    fetch={fetch} 
                />}
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
            {templates.map((item,index )=> <TemplateCard 
                                            key={item.id} 
                                            template={item} 
                                            index={index}
                                            renameTemplate={OpenRenameTemplate}
                                            deleteTemplate={handleDelete} 
            />)}
            </div>
        </div>
    )
}

export default Workout

const TemplateCard = ({template,index,deleteTemplate,renameTemplate}) => {
    const [showDropdown,setShowDropdown] = useState(false)
    const {id,name,exercises} = template

    const handleClick = (e) => {
        setShowDropdown(true)
    }
    const hideDropDown = () => {
        setShowDropdown(false)
    }
    const handleDelete = () => deleteTemplate(id,index)
    const handleRename = () => {
        renameTemplate({name,index,id})
        hideDropDown()
    }

    return(
        <div className='exercise-template-card' style={{position:"relative"}}>
            <div className='exercise-template-card-section-1'>
                <h3>{name}</h3>
                <button onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV}/></button>
                {showDropdown && 
                    <DropDown 
                        handleDelete={handleDelete}
                        handleRename={handleRename}
                        hide={hideDropDown}
                    />
                }
            </div>
            {exercises.map(item => <p key={item.id}>{item.sets} x {item.name} </p>)}
        </div>
    )
}

const DropDown = ({handleRename,handleDelete,hide}) =>{
    const domnode = useClickOutside(()=>{
        hide()
    })

    return(
        <div ref={domnode} className='template-dropdown'>
            <ul className='template-dropdown-options'>
                <li>Edit</li>
                <li onClick={handleRename}>Rename</li>
                <li onClick={handleDelete}>Delete</li>
            </ul>
        </div>
    )
}

