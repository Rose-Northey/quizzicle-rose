import { Quiz } from '../../models/quiz.ts'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getQuizzes } from '../api.ts'

export default function QuizList() {
  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['quiz'], queryFn: getQuizzes })

  if (isLoading) {
    return <div>Loading... </div>
  }

  if (isError) {
    return <div>Broekd!</div>
  }

  return (
    <>
      <div className="ulQuizName">
        <ul className="ulQuizName">
          {quiz?.map((quizzes: Quiz) => {
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
