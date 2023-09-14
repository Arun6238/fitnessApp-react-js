import "./filter.css"
import { useState } from "react"
import { faSearch , faFilter} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const Filter = ({changeName,selectBodyPart,selectCategory,body_part,category}) => {
    const [showFilter,setShowFilter] = useState(false)
    const toggleShowFilter = () => {
        setShowFilter(!showFilter)
    }
    return(
        <>
            <section className="filter-section-1">
                <span className="filter-search" >
                    <FontAwesomeIcon  icon={faSearch}/>
                    <input type="text"  onChange={changeName} />     
                </span>
            
                <span className="filter-button " onClick={toggleShowFilter}>
                    <FontAwesomeIcon icon={faFilter}/> 
                </span> 
            </section>
            {showFilter && <FilterItems 
                    selectBodyPart={selectBodyPart} 
                    selectCategory={selectCategory}
                    category={category}
                    bodyPart={body_part}
                    closeFilter={toggleShowFilter}
                 />
            }
        </>
    )
}

const FilterItems =(args) => {
    const BODYPART_CHOICES = ["Core","Arms","Back","Chest","Legs","Shoulders","Other","Olympic","Full body","Cardio"]
    const CATEGORY_CHOICES = ["Barbell","Dumbbell","Machine/Other","Weighted bodyweight","Assisted body","Reps only",,"Cardio exercice","Duration"
    ]
    const [bodyPart,setBodyPart] = useState(args.bodyPart)
    const [category,setCategory] = useState(args.category)

    // variable to check if the filter change
    const displayButton = bodyPart !=args.bodyPart || category !=args.category
    const handleSelectBodyPart = (e) => {
        if(e.target.value === bodyPart){
            e.target.checked = false
            setBodyPart("")
            return
        }
        setBodyPart(e.target.value)
    }
    const handleSelectCategory = (e) => {
        // if the value of selected radio button is smame as current category setT the category empty and un select the radio button
        if(e.target.value === category){
            e.target.checked = false
            setCategory("")
            return
        }
        setCategory(e.target.value)
    }
    const applyChanges = () => {
        args.selectBodyPart(bodyPart)
        args.selectCategory(category)
        args.closeFilter()
    }
    return <>
        <div className="filter-items-container">
            <h5>Body part</h5>
            <ul className="filter-items-column">
                
                {BODYPART_CHOICES.map((item)=>
                    <li key={item} value={item} className={item === bodyPart?"selected":undefined}>
                        <label >
                            <input 
                                type="radio"
                                name="body-part"
                                value={item}
                                onClick={handleSelectBodyPart}
                             />
                             {item}
                        </label>
                    </li>)}
            </ul>
            <h5>Category</h5>
            <ul className="filter-items-column">
                {CATEGORY_CHOICES.map((item)=>
                    <li key={item} value={item} className={item === category?"selected":undefined}>
                        <label >
                            <input 
                                type="radio"
                                name="category"
                                value={item}
                                onClick={handleSelectCategory}
                             />
                             {item}
                        </label>
                    </li>)}
            </ul>
            <div className="filter-items-column">
            {displayButton?
                <button onClick={applyChanges}>Apply</button>:
                <button onClick={args.closeFilter}>Close</button>
            }
            </div>
            
        </div>
    </>
}
