import { useState } from 'react'
import { AddQuiz } from '../api'
import { useNavigate } from 'react-router-dom'

function QuizCreate() {
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [quizName, setQuizName] = useState<string>('')

  const navigate = useNavigate()
  //when quizName is "", there is a p element under the form which is set to no class, when the quiz name is not "", it disappears by setting the class name to "hidden"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newQuizId = await AddQuiz({ quizName, isPublic })
    navigate(`/${newQuizId}/add-question`)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setQuizName(event.target.value)
  }

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked)
  }

  return (
    <>
      <div className="create">
        <form className="vflex" onSubmit={handleSubmit}>
          <label htmlFor="quiz name" className="vflex">
            Quiz name</label>
            <input
              className="nameInput"
              type="text"
              name={quizName}
              id="quiz name"
              onChange={handleNameChange}
              required
            />
            <p className={quizName === ''?'error':'error hidden'} >Field is required</p>


          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handleCheckbox}
            />
            Should this quiz be public to all users?
          </label>

          <button>Create and add questions</button>
        </form>
      </div>
    </>
  )
}

export default QuizCreate
