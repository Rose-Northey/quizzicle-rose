//import thingy
import { useQuery } from '@tanstack/react-query'
import server from '../../server/server'

function QuizResult() {
  //make useQuery
  const getScore = async () => {
    const data = await server.get('api/:quizId/my-result')
    return data
  }
  const score = 0
  //https://dev.to/abeinevincent/data-fetching-from-an-api-using-react-query-usequery-hook-explained-in-plain-english-4eei

  //all variables below this point are filler only. Do not use
  return (
    <div>
      <h1>{`${quizId}`}</h1>
      <p>
        You answered {`${score}`} out of {`${totalQuestions}`} questions
        correctly and scored {`${calcAmount}`}%
      </p>
    </div>
  )
}

export default QuizResult
