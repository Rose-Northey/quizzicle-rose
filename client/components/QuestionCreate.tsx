import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { Question, Text} from '../../models/question'
import { addQuestion, getQuizName } from '../api'
function QuestionCreate() {
  const [text, setText] = useState({
    questionText: '',
    correctAnswer: '',
    incorrectAnswer1: '',
    incorrectAnswer2: '',
    incorrectAnswer3: '',
  }as Text)

  const params = useParams()

  const {
    data: quizName,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['quiz', params.quizId],
    queryFn: async () => {
      return await getQuizName(params.quizId)
    },
  })

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const addQuestionMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess: async () => {
      queryClient.invalidateQueries(['question'])
      setText({
        questionText: '',
        correctAnswer: '',
        incorrectAnswer1: '',
        incorrectAnswer2: '',
        incorrectAnswer3: '',
      })
    },
  })

  if (isLoading) {
    return 'Loading...'
  }
  if (error) {
    return 'Status Code 500: Internal Server Error'
  }
  function handleChange(e: { target: { id: string; value: string } }) {
    const key = e.target.id
    // key is the incorrectAnswer1, correct answer etc
    // therefore this changes the text object under the correct key
    const stateObj = {
      ...text,
      [key]: e.target.value,
    }
    setText(stateObj)
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    addQuestionMutation.mutate({ quiz_id: params.quizId, text })
    navigate('/')
  }
  function handleMakeAnother(e: { preventDefault: () => void }) {
    e.preventDefault()
    addQuestionMutation.mutate({ quiz_id: params.quizId, text })
  }
  function handleCancel(e: { preventDefault: () => void }) {
    e.preventDefault()
    navigate('/')
  }
  return (
    <div>
      <h1>{quizName}</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }} method="post">
        <label htmlFor="questionText">Question</label>
        <input
          type="text"
          className="fun"
          value={text.questionText}
          id="questionText"
          onChange={handleChange}
        />
        <label htmlFor="correctAnswer">Correct answer</label>
        <input
          type="text"
          id="correctAnswer"
          value={text.correctAnswer}
          required
          onChange={handleChange}
        />
        <label htmlFor="incorrectAnswer1"> Incorrect Answer</label>
        <input
          type="text"
          id="incorrectAnswer1"
          value={text.incorrectAnswer1}
          required
          onChange={handleChange}
        />
        <label htmlFor="incorrectAnswer2"> Incorrect Answer</label>
        <input
          type="text"
          id="incorrectAnswer2"
          value={text.incorrectAnswer2}
          required
          onChange={handleChange}
        />
        <label htmlFor="incorrectAnswer3"> Incorrect Answer</label>
        <input
          type="text"
          id="incorrectAnswer3"
          value={text.incorrectAnswer3}
          required
          onChange={handleChange}
        />
      </form>
      <button onClick={handleMakeAnother}>Add and make another</button>
      <button onClick={handleSubmit}>Add and all done</button>
      <button onClick={handleCancel}>Cancel and exit</button>
    </div>
  )
}

export default QuestionCreate
