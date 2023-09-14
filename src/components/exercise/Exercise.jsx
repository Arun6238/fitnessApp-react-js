import { useParams } from "react-router-dom"
import "./exercise.css"
import { useState } from "react"
const Exercise = () => {
  const params = useParams()
  const [tab,setTab] = useState("about")

  const isCustom = params.isCustom === 'true'
  const exerciseId = params.exerciseId
  const name = params.name

  const tabs= {
		"about":<About/>,
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

const About = () => {
  return <>
    <h2>About</h2>
  </>
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