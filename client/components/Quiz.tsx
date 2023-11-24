import { getSingleQuiz, calculateResults } from '../api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Question, SelectedAnswer } from '../../models/question'
import { useParams, useNavigate } from 'react-router-dom'

function Quiz() {
  const queryClient = useQueryClient()
  const resultsMutation = useMutation({
    mutationFn: calculateResults,
    onSuccess: async (results) => {
      queryClient.setQueryData(['results'], results)
      navigate(`/${quizData[0].quizId}/my-result`)
    },
  })
  const navigate = useNavigate()
  const [selectedAnswers, setSelectedAnswers] = useState([] as SelectedAnswer[])
  const quizId = useParams().quizId as string

  const handleRadioOption = (evt, questionId: Question['questionId']) => {
    const answer = evt.target.value
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer })
  }

  const {
    data: quizData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['quizData', quizId],
    queryFn: async () => {
      return await getSingleQuiz(quizId)
    },
    staleTime: Infinity,
    refetchOnMount: 'always',
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
      resultsMutation.mutate({ quizId, selectedAnswers })
    } catch (error) {
      console.error('An error occurred during submission:', error)
    }
  }

  return (
    <>
      <div>
        <h1>{quizData[0]?.quizName}</h1>

        <form onSubmit={handleSubmit}>
          <ol>
            {quizData.map((question: Question) => {
              return (
                <li key={question.questionId}>
                  {question.questionText}
                  {question.answers.map((answer, index) => {
                    const answerItemId = `answer-${question.questionId}-${index}`
                    return (
                      answer?.length && (
                        <div key={`${answer}-answers`}>
                          <input
                            type="radio"
                            id={answerItemId}
                            name={`question-${question.questionId}`}
                            value={answer}
                            onChange={(e) => {
                              handleRadioOption(e, question.questionId)
                            }}
                            required
                          />
                          <label htmlFor={answerItemId}>{answer}</label>
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
