import {useState} from 'react'

function QuizCreate() {
  const[isPublic, setIsPublic] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>)=>{
    event.preventDefault()
    
  }



  return (<>
    <form onSubmit = {handleSubmit}>
      <label>Quiz Name</label>
      

    </form>
  </>)
}

export default QuizCreate
