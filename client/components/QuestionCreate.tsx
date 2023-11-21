import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import { Question } from "../../models/question"
import { addQuestion } from "../api"
function QuestionCreate() {
  const [text,setText] = useState({} as Question)

  const params = useParams()
  const queryClient  = useQueryClient()
  const addQuestionMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess:async()=>{
      queryClient.invalidateQueries(['question'])
    }
  })

  function handleChange(e){
    const key = e.target.id
    const stateObj = {
      ...text,
      [key]:e.target.value
    }
    setText(stateObj)
  }
  async function handleSubmit(e){
    e.preventDefault()
    addQuestionMutation.mutate({quiz_id:params.quizId,text})
    console.log(params)
    console.log(text)
  }
  function handleClick(e){
    
    e.preventDefault()
  }
  return (
    <div >
    <h1>How Will I Know?</h1>
    <form onSubmit = {handleSubmit}style={{display:'flex',flexDirection:'column'}} action="/questions" method="post">
    <label htmlFor="question_text">Question</label>
    <input type="text" value = {text.questionText} id="question_text" required onChange = {handleChange}/>
    <label htmlFor="correct_answer">Correct answer</label>
    <input type="text" id = "correct_answer" value = {text.correctAnswer} onChange = {handleChange}/>
    <label htmlFor="incorrect_answer1"> Incorrect Answer</label>
    <input type="text" id = "incorrect_answer1" value = {text.incorrectAnswer1} onChange = {handleChange}/>
    <label htmlFor="incorrect_answer2"> Incorrect Answer</label>
    <input type="text" id = "incorrect_answer2"  value = {text.incorrectAnswer2} onChange = {handleChange}/>
    <label htmlFor="incorrect_answer2"> Incorrect Answer</label>
    <input type="text" id = "incorrect_answer3" value = {text.incorrectAnswer3} onChange = {handleChange}/>
    <button onClick ={handleClick}>Add and make another</button>
    <button type = "submit">Add and all done</button>
    <button >Cancel and exit</button>
    </form>
    </div>
    
  )
}

export default QuestionCreate
