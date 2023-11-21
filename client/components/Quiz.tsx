import { getQuizQuestions } from "../api"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function Quiz() {

  const {
    data: quizData, isError, isLoading,} = useQuery({
    queryKey: ['confessions'],
    queryFn:  getQuizQuestions
    },
  )


  return <>
    <h1>{quizData.quiz_name}</h1>
    {/* method="post" action='/quizresultspage' */}
    <form >
    
    </form>
  </>
}

export default Quiz


//      <input type="radio" id="Q1" name="fav_language" value="HTML">
//     <label for="html">HTML</label><br>
//     <input type="radio" id="Q2" name="fav_language" value="CSS">
//     <label for="css">CSS</label><br>
//     <input type="radio" id="Q3" name="fav_language" value="JavaScript">
//     <label for="css">CSS</label><br>
//     <input type="radio" id="Q3" name="fav_language" value="JavaScript">
//     <label for="javascript">JavaScript</label>
