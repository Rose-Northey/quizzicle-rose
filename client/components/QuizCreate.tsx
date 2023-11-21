import {useState} from 'react'

function QuizCreate() {
  const[isPublic, setIsPublic] = useState<boolean>(false)
  const[quizName, setQuizName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>)=>{
    event.preventDefault()
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
  };

  const handleCheckbox = (event:React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };




  return (<>
    <form onSubmit = {handleSubmit}>


      <label>Quiz name
        <input type='text' name={quizName} id={quizName} onChange={handleNameChange}/>
      </label>

      <label>
          <input type='checkbox' checked={isPublic} onChange={handleCheckbox}/>
      </label>
      <button>Create and add questions</button>


    </form>
  </>)
}

export default QuizCreate
