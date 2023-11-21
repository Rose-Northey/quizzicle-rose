import {useState} from 'react'
import {AddQuiz} from '../api'

function QuizCreate() {
  const[isPublic, setIsPublic] = useState<boolean>(false)
  const[quizName, setQuizName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    AddQuiz({quizName, isPublic})
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setQuizName(event.target.value);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };




  return (<>
  <div className='create'>
    <form className = 'vflex' onSubmit = {handleSubmit}>
      <label className='vflex'>Quiz name
        <input className='nameInput'type='text' name={quizName} id={quizName} onChange={handleNameChange}/>
      </label>

      <label> 
          <input type='checkbox' checked={isPublic} onChange={handleCheckbox}/>Should this quiz be public to all users?
      </label>

      <button>Create and add questions</button>
    </form>
  </div>
  </>)
}

export default QuizCreate
