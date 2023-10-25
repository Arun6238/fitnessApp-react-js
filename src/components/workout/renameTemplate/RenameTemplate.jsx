import { useRef, useState} from "react"
import useClickOutside from "../../../hooks/clickOutside"
import removeOverflow from "../../../hooks/removeOverflow"
import "./renameTemplate.css"
import { useRenameTemplateStore } from "./renameStore"

const RenameTemplate = ({renameLocally,close,fetch}) => {
    const {name,index,id,setRenameTemplateName}  = useRenameTemplateStore()
    const [warning,setWarning] = useState("")
    const prevName = useRef(name)
    const ref = useClickOutside(()=>{
        close()
    })

    const rename = async () => {
        if(prevName.current === name){
            setWarning("Please enter a new name")
            alert("enthuadey...")
            return
        }
        const url = `exercise/rename-template/${id}`
        const options = {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name})
        }
        try{
            const {data,status } = await fetch(url,options)
            if(status === 200){
                renameLocally(name,index)
                close()
            }
            console.log(data)
        }
        catch(e){
            console.error(e)
        }

    }
    const handleNameChange = (e) => {
        // clear warning if not empty
        if(warning){
            setWarning("")
        }
        setRenameTemplateName(e.target.value)
    }
    removeOverflow()
    return (
        <div className='rename-template-card'>
            <div ref={ref} className='rename-template-card-form'>
                <h3 className='rename-template-card-title'>Rename template</h3>
                <label htmlFor="rename-template-inp">Choose a name</label>
                <input type="text" id="rename-template-inp" onChange={handleNameChange} value={name} />
                <span className="rename-template-card-warning">{warning}</span>
                <div className='rename-template-form-buttons'>
                    <button onClick={close} className='rename-template-cancel'>CANCEL</button>
                    <button  onClick={rename} className='rename-template-ok'>YES</button>
                </div>
            </div>
        </div>)
}
export default RenameTemplate