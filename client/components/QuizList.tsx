import { Quiz, QuizData } from '../../models/quiz.ts'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import { ErrorMessage } from './Styled.tsx'
// import { useQuizzes } from '../hooks.ts'
// import { response } from 'express'
// import { getQuizzes } from '../../server/db/quizzes.ts'
import { getQuizzes } from '../api.ts'

//QuizList
// const getQuizzes = async (Quiz) => {
//   const response = await get('/api/v1/quizzes')
//   if (!response.ok) {
//     throw new Error('Could not get quizzes')
//   }
//   return response.json(Quiz)
// }

export default function QuizList() {
  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['quiz'], queryFn: getQuizzes })

  // function QuizList() {
  //   const [error, setError] = useState('')
  //   const quizzes = useQuizzes()

  //   const hideError = () => {
  //     setError('')
  //   }

  if (isLoading) {
    return <div>Loading... </div>
  }

  if (isError) {
    return <div>Broekd!</div>
  }
  console.log(quiz)
  return (
    <>
      <div className="ulQuizName">
        <ul className="ulQuizName">
          {quiz.map((quizzes: Quiz) => {
            return (
              <li key={quizzes.quizId}>
                <Link to={`/${quizzes.quizId}`}>{quizzes.quizName}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
