import { useParams } from "react-router-dom"
import "./exercise.css"
import { useEffect, useState } from "react"
import {useAuthenticatedFetch} from "../../hooks/api"
const Exercise = () => {
  const params = useParams()
  const [tab,setTab] = useState("about")
  const [aboutData,setAboutData] = useState({
	image:"",
	isCustom:"",
	instruction:[],
  })
  const isCustom = params.isCustom === 'true'
  const exerciseId = params.exerciseId
  const name = params.name
  const fetchApi = useAuthenticatedFetch()
  useEffect( () => {
		const fetchData = async()=>{
			const url = `exercise/exercise-details?exercise_id=${exerciseId}&isCustom=${isCustom}`
			try{
				const {data,status} = await fetchApi(url)
				const {exercise,instructions} = data
				setAboutData({
					image:exercise.image,
					isCustom:isCustom,
					instructions:instructions
				})
				console.log(status)
			}
			catch(error){
				console.error(error)
			}
		}
		fetchData()
  },[])

  const tabs= {
		"about":<About {...aboutData}/>,
		"history":<History/>,
		"records":<Records/>
	}

  const handleSelectTab = (e) => {
	  setTab(e.target.value)
  }
  return (
    <>
      	<h2>{name}</h2>
      	<TabNavBar tab={tab} tabs={Object.keys(tabs)} handleSelect={handleSelectTab}/>
		<div className="exercise-tab-view">
			{tabs[tab]}
	  	</div>
    </>
    
  )
}
export default Exercise

const TabNavBar =({tabs,handleSelect,tab}) => {
	return <>
		<div className="exercise-tabs">
			{tabs.map(item=>{
				return 	<label key={item} htmlFor={item} className={tab === item?"selected-tab":undefined}>
							<input 
								type="radio" 
								name="tabs"  
								id={item} 
								value={item}
								checked={tab === item}
								onChange={handleSelect}
							/>
							{item.toLocaleUpperCase()}
						</label>
					})
			}
		</div>
	</>
}

const About = ({image="",instructions=[],isCustom=flase}) => {
	if(isCustom){
		return <>
			<p>This is a Custom exercise</p>

		</>
	}
	else{
		return( 
			<div className="exercise-about-container">
				<img src={image} alt="an exererce image"/>
				<div className="exercise-instructions">
					<h5>Instructions</h5>
					{instructions.map((item)=>{
						return<div key={item.step_number} className="exercise-instruction">
								<div className="exercise-step-number"><span>{item.step_number}</span></div>
								<div className="exercise-instruction-text">{item.text}</div>
							</div>
					})}
				</div>
			</div>
		)
	}
}

const History = () => {
  return <>
    <h2>History</h2>
  </>
}

const Records = () => {
  return <>
    <h2>Records</h2>
  </>
}