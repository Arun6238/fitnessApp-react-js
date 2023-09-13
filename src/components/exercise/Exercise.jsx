import { useParams } from "react-router-dom"
const Exercise = () => {
  const params = useParams()
  const isCustom = params.isCustom === 'true'
  const exerciseId = params.exerciseId
  const name = params.name
  return (
    <div>Exercise</div>
  )
}
export default Exercise
