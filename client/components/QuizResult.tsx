//import thingy
import { useQuery } from '@tanstack/react-query'

function QuizResult() {
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['results'],
    queryFn: () => {},
    staleTime: Infinity,
  })

  if (!results || isLoading) {
    return <div>No results</div>
  }

  if (isError) {
    return <div>Broekd!</div>
  }

  const percentage = (results?.score * 100) / results?.questionCount
  const roundPercent = percentage.toFixed(2)

  return (
    <div>
      <h1>Quiz Results</h1>
      <p>
        You answered {`${results?.score}` || 0} out of{' '}
        {`${results?.questionCount}` || 0} questions correctly and scored{' '}
        {`${roundPercent}`}%
      </p>
    </div>
  )
}

export default QuizResult
