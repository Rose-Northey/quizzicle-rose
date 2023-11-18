import { Quiz, QuizData } from '../../models/quiz.ts'

import { useState } from 'react'
import { ErrorMessage } from './Styled.tsx'
import { useQuizzes } from '../hooks.ts'

function QuizList() {
  const [error, setError] = useState('')
  const quizzes = useQuizzes()

  const hideError = () => {
    setError('')
  }

  if (quizzes.isLoading) {
    let failures = ''
    if (quizzes.failureCount > 0) {
      failures = ` (failed ${quizzes.failureCount} times)`
    }

    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (quizzes.isRefetching) fetchStatus = 'Refreshing...'

  if (quizzes.error instanceof Error) {
    return (
      <ErrorMessage>
        Failed to load quizzes: {quizzes.error.message}
      </ErrorMessage>
    )
  }

  return (
    <>
      {error !== '' && (
        <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>
      )}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      {quizzes.status === 'success' && (
        <pre>{JSON.stringify(quizzes.data, null, 2)}</pre>
      )}
    </>
  )
}

export default QuizList
