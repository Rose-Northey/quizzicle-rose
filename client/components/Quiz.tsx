import { getSingleQuiz } from "../api"
import { useState, useMutation, useQuery } from '@tanstack/react-query'

function Quiz() {

  const {
    data: quizData, isError, isLoading,} = useQuery({
    queryKey: ['quizData'],
    queryFn:  getSingleQuiz
    },
  )

  const [results, setResults] = 


  return (
  <>
    <h1>{quizData.quiz_name}</h1>

    <form submit={handleSubmit} >
      <button>Submit</button>
    </form>
  </>
  )
}
export default Quiz

    {/* method="post" action='/quizresultspage' */}
{/* <form submit={handleSubmit} >
{quizData.map(quizElement => {
  <li>{quizElement.question_text}
    {Object.keys(element).forEach(key => {
      <input type="radio" id='1' name="fav_language" value={answers[key]}>
    <label for="javascript">JavaScript</label>
    })}
    
  </li>


})}
<button>Submit</button>
</form> */}