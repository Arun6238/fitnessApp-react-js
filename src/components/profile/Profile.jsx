import { useState,Fragment, useEffect } from "react"
import {useAuthStore} from "../../stores/authStore"

const BODY_PART_CHOICES = [
    "",
    "None",
    "Core",
    "Arms",
    "Back",
    "Chest",
    "Legs",
    "Shoulders",
    "Other",
    "Olympic",
    "Full body",
    "Cardio",
]

const CATEGORY_CHOICES = [
    "",
    "Barbell",
    "Dumbbell",
    "Machine/Other",
    "Weighted bodyweight",
    "Assisted body",
    "Reps only",
    "Cardio exercice",
    "Duration"
]

const Profile = () => {
    const [exercise, setExercise] = useState("")
    const [imageUrl,setImageUrl] = useState("")
    const [bodyPart,setBodyPart] = useState("")
    const [category,setCategory] = useState("")

    const [instruction ,setInstruction] = useState([""])
    const [isLenghtOne,setIsLengthOne]= useState(true)

    const {accessToken} = useAuthStore()

    useEffect(() => {
        instruction.length === 1?setIsLengthOne(true):setIsLengthOne(false)
    },[instruction])

    const addInstruction = () => {
        const lastElement = instruction.slice(-1)[0]
        if(lastElement.length <= 5) return
        setInstruction(prevState => {
            return [...prevState,""]
        })
    } 
    const updateInstruction = (index,value) => {
        const newInstruction = [...instruction]
        newInstruction[index] = value
        setInstruction(newInstruction)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            exercise:{
                name:exercise,
                image:imageUrl,
                bodyPart,
                category
            },
            instruction
        }
        console.log(data)
       let isSuccess =  sendData(data,accessToken)
       console.log("hey",isSuccess)
       if(isSuccess){
            setExercise("")
            setImageUrl("")
            setBodyPart("")
            setCategory("")
            setInstruction([" "])
       }
    }
    return (
        <>  
            <h2>This is profile page</h2>
            <form onSubmit={handleSubmit}>
                <h3>Add Exercise</h3>
                <input 
                    type="text" 
                    placeholder="Enter exercise name"
                    name="exercise"
                    value={exercise} 
                    required
                    onChange={e => {setExercise(e.target.value)}} 
                />
                <br />
                <input 
                    type="text"
                    name="imageUrl"
                    placeholder="enter image url"
                    value={imageUrl}
                    required
                    onChange={e => {
                        setImageUrl(e.target.value)
                    }}
                />
                <br />
                <select 
                    name="body-part" 
                    value={bodyPart} 
                    required
                    onChange={e =>{
                    setBodyPart(e.target.value)
                }}>
                    {BODY_PART_CHOICES.map((choice => {
                        return <option key={choice} value={choice}>{choice}</option>
                    }))}
                </select>
                <br />
                <select 
                    name="category" 
                    value={category}
                    required 
                    onChange={e =>{
                    setCategory(e.target.value)
                    }}>
                    {CATEGORY_CHOICES.map((choice => {
                        return <option key={choice} value={choice}>{choice}</option>
                    }))}
                </select>
                

                <h4>Instrucitons</h4>
                {instruction.map((element ,index) => {
                    return <Fragment key={index}>
                        <br />
                        <label>
                            {index + 1 +" "}
                            <input 
                                type="text" 
                                required
                                value={element.text} 
                                onChange={e => {
                                    updateInstruction(index,e.target.value)
                                }} 
                            />
                        </label>
                    </Fragment>
                })}

                {isLenghtOne?null:(
                                    <button
                                        type="button"
                                        onClick={()=>{
                                            setInstruction(prevState => {
                                                let newArray = [...prevState]
                                                newArray.pop()

                                                return newArray
                                            })
                                        }}>
                                        Remove
                                    </button>)
                }
                <br />
                <button type="button" onClick={addInstruction}>Add</button>
                <br /><br /><button type="submit">Save</button>
            </form>
            <br /><br /><br />
        </>
    )
}

export default Profile

async function sendData(data,token){
    const url = "http://localhost:8000/api/exercise/add-default-exercise/"
    const options = {
        method: 'POST',
        
        headers:{
            'Content-type' : 'application/json',
             Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(data)
    }
    try{
        const res = await fetch(url,options)
        if(res.ok){
            const data = await res.json()
            return true
        }
        else{
            console.log("request failed")
            const errorData = await res.json()
            console.log(errorData.detail)
            return false
        }
    }
    catch (error){
        console.log("Something went wrong:", error)
        return false
    }
}