import { getSingleQuiz, postSelectedAnswers} from '../api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Question } from '../../models/question'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { Radio } from './Styled'


interface SelectedAnswer {
  questionId: string
  selectedAnswer: string
}

function Quiz() {
  const navigate = useNavigate()
  const [selectedAnswer, setSelectedAnswers] = useState({} as SelectedAnswer[])
  // selectedAnswer = {quizId: quizData[0].quizId}


  const handleRadioOption1 = (evt) => {
    const answer = evt.target.value
    const questionNumber = evt.target.id

    setSelectedAnswers({ ...selectedAnswer, [questionNumber]: answer })
  }

  const { quizId } = useParams()

  const {
    data: quizData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['quizData'],
    queryFn: async () => {
      return await getSingleQuiz(quizId)
    },
  })
  if (isError) {
    return <p>Im broked</p>
  }

  if (!quizData || isLoading) {
    return <p>Loading...</p>
  }
  const handleSubmit = async (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
  
    try {
      const quizResponses = Object.values(selectedAnswer)
      postSelectedAnswers(quizId, quizResponses)
      navigate(`/${quizData[0].quizId}/my-result`)

    } catch (error) {
      console.error('An error occurred during submission:', error)
    }
  }
  // add onchange and values for each field on form

  return (
    <>
      <div>
        <h1>{quizData[0].quizName}</h1>

        <form onSubmit={handleSubmit}>
          <ol>
            {quizData.map((question: Question) => {
              return (
                <li key={question.questionId}>
                  {question.questionText}
                  {question.answers.map((answer) => {
                    return (
                      answer?.length && (
                        <div key={`${answer}-answers`}>
                          <input
                            type="radio"
                            id={`${question.questionId}`}
                            name={question.questionText}
                            value={answer}
                            onChange={handleRadioOption1}
                            required
                          ></input>
                          <label>{answer}</label>
                          <br />
                        </div>
                      )
                    )
                  })}
                </li>
              )
            })}
          </ol>
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}
export default Quiz

// / {question.answers.map( answer => {
//   return <label></label>
//   <input type="radio" id='1' name="fav_language" value={answers[key]}></input>
// })}

// {
//   /* method="post" action='/quizresultspage' */
// }
// {
//   /*{quizData.map(quizElement => {
//   <li>{quizElement.question_text}
//     {Object.keys(element).forEach(key => {
//       <input type="radio" id='1' name="fav_language" value={answers[key]}>
//     <label for="javascript">JavaScript</label>
//     })}

//   </li>

// })}
// <button>Submit</button>
// </form> */
// }

// const [results, setResults] = useState([])

// const handleSubmit = (evt) => {
//   evt.preventDefault()
//   setResults([...results, results])
// setNewScare({
//   name: '',
//   rating: '',
//   origin: '',
//   lastScare: '',
// })
// }
