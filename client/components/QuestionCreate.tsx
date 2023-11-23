import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {useParams,useNavigate} from 'react-router-dom'
import { Question } from "../../models/question"
import { addQuestion } from "../api"
function QuestionCreate() {
  const [text,setText] = useState({} as Question)

  const params = useParams()
  const queryClient  = useQueryClient()
  const navigate = useNavigate()
  const addQuestionMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess:async()=>{
      queryClient.invalidateQueries(['question'])
      setText({
        questionText: "",
        correctAnswer: "",
        incorrectAnswer1: "",
        incorrectAnswer2: "",
        incorrectAnswer3: ""
      } as Question)
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
    navigate('/')
  
  }
  function handleMakeAnother(e){
    e.preventDefault()
    addQuestionMutation.mutate({quiz_id:params.quizId,text})
    
  }
  function handleCancel(e){
    e.preventDefault()
    navigate('/')
  }
  return (
    <div >
    <h1>How Will I Know?</h1>
    <form style={{display:'flex',flexDirection:'column'}} method="post">
    <label htmlFor="questionText">Question</label>
    <input type="text" className="fun" value = {text.questionText} id="questionText" required onChange = {handleChange}/>
    <label htmlFor="correctAnswer">Correct answer</label>
    <input type="text" id = "correctAnswer" value = {text.correctAnswer} required onChange = {handleChange}/>
    <label htmlFor="incorrectAnswer1"> Incorrect Answer</label>
    <input type="text" id = "incorrectAnswer1" value = {text.incorrectAnswer1} required onChange = {handleChange}/>
    <label htmlFor="incorrectAnswer2"> Incorrect Answer</label>
    <input type="text" id = "incorrectAnswer2"  value = {text.incorrectAnswer2} required onChange = {handleChange}/>
    <label htmlFor="incorrectAnswer2"> Incorrect Answer</label>
    <input type="text" id = "incorrectAnswer3" value = {text.incorrectAnswer3} required onChange = {handleChange}/>
    </form>
    <button onClick = {handleMakeAnother}>Add and make another</button>
    <button onClick = {handleSubmit}>Add and all done</button>
    <button onClick = {handleCancel}>Cancel and exit</button>
    </div>
    
  )
}

export default QuestionCreate
