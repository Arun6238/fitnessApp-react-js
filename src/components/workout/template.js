import { useState } from "react";


export default function useTemplates(){
    const [templates,setTemplates] = useState([])
    const renameTemplate = (name,index)=>{
        setTemplates(prevState => {
            const newTemplates = [...prevState]
            console.log(name)
            newTemplates[index] = {...newTemplates[index],name}
            return newTemplates
        })
    }
    const removeTemplate = (index) => {
        setTemplates(prevState => {
            const newState = [...prevState]
            newState.splice(index,1)
            return newState
        })
    }
    const addTemplates = (templates) => {
        setTemplates([...templates])
    }

    return {templates,renameTemplate,removeTemplate,addTemplates}
}

