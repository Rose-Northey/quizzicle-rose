//import thingy
import { useQuery } from '@tanstack/react-query'
import server from '../../server/server'
import { useFetcher, useParams } from 'react-router-dom'
import { getResults} from '../api'
import { useEffect, useState } from 'react'

function QuizResult() {
  const quizId = Number(useParams().quizId)
 
    const {
      data: results,
      isLoading,
      isError,
    } = useQuery({ queryKey: ['results'], queryFn: getResults})
  
    if (isLoading) {
      return <div>Loading... </div>
    }
  
    if (isError) {
      return <div>Broekd!</div>
    }
  
    const percentage = results.score*100/results.question_count
    const roundPercent = percentage.toFixed(2)


  return (
    <div>
      <h1>Quiz Results</h1>
      <p>
        You answered {`${results.score}`} out of {`${results.question_count}`}{' '}
        questions correctly and scored{' '}
        {`${roundPercent}`}%
      </p>
    </div>
  )
}

export default QuizResult

// {score: 1, questionCount: 3}
