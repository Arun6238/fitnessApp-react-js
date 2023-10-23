import { useEffect} from "react"
import useClickOutside from "../../../hooks/clickOutside"
import "./renameTemplate.css"
import { useRenameTemplateStore } from "./renameStore"

const RenameTemplate = ({renameLocally,close,fetch}) => {
    const {name,index,id,setRenameTemplateName}  = useRenameTemplateStore()
    const ref = useClickOutside(()=>{
        close()
    })

    const rename = async () => {
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
        setRenameTemplateName(e.target.value)
    }
    useEffect(()=>{
        document.body.style.overflowY = "hidden"
        return () => document.body.style.overflowY = "visible"
    },[])
    return (
        <div className='rename-template-card'>
            <div ref={ref} className='rename-template-card-form'>
                <h3 className='rename-template-card-title'>Rename template</h3>
                <label htmlFor="rename-template-inp">Choose a name</label>
                <input type="text" id="rename-template-inp" onChange={handleNameChange} value={name} />
                <div className='rename-template-form-buttons'>
                    <button onClick={close} className='rename-template-cancel'>CANCEL</button>
                    <button  onClick={rename} className='rename-template-ok'>OK</button>
                </div>
            </div>
        </div>)
}
export default RenameTemplate