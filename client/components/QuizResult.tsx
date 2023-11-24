//import thingy
import { useQuery } from '@tanstack/react-query'
import server from '../../server/server'
import { useFetcher, useParams } from 'react-router-dom'
import { getAnswers } from '../api'
import { useEffect, useState } from 'react'

function QuizResult() {
  const quizId = Number(useParams().quizId)
 

  const [results, setResults] = useState({})

  useEffect(() => {
    async function fetchResults() {
      const resultsFromApi = await getAnswers(quizId)

      setResults(resultsFromApi)
    }
    fetchResults(quizId)
  }, [])
  console.log(results?.score)

  return (
    <div>
      <h1>Quiz Results</h1>
      <p>
        You answered {`${results.score}`} out of {`${results.questionCount}`}{' '}
        questions correctly and scored{' '}
        {`${(100 * Number(results.score)) / Number(results.question)}`}%
      </p>
    </div>
  )
}

export default QuizResult

// {score: 1, questionCount: 3}
