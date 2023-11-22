import { getSingleQuiz } from '../api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Question } from '../../models/question'
import { Routes, Route, useParams } from 'react-router-dom'
import { Radio } from './Styled'

function Quiz() {

  const { quizId } = useParams()

  const {
    data: quizData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['quizData'],
    queryFn: async () => {
      return await getSingleQuiz(quizId)
    },
  })
  if (isError) {
    return <p>Im broked</p>
  }

  if (!quizData || isLoading) {
    return <p>Loading...</p>
  }
  console.log(quizData)
  // 2. create state for newScares

  // const [newResult, setNewResult] = useState({
  //   question1: false,
  //   question2: false,
  //   question3: false,
  // })

   // 3. handle type function create const for key and new StateObject (copt newResult add key and value pair) and setNewResult to state obj

  //  const handleChange = (evt) => {
  //   const key = evt.target.id
  //   const stateObj = {
  //     ...newResult,
  //     [key]: evt.target.value,
  //   }
  //   setNewResult(stateObj)
  // }
   // 4. handle submit should prevent default set scares to copy scares and add newScare and reset newScares
  //  const handleSubmit = (evt) => {
  //   evt.preventDefault()
  //   // setResult([...scares, newScare])
  //   setNewResult({
  //     question1: false,
  //     question2: false,
  //     question3: false,
  //   })
  // }
  // add onchange and values for each field on form
  return (
    <>
      <div>
        <h1>{quizData[0].quizName}</h1>
        {/* <form submit={handleSubmit}> */}
        <form onSubmit={'hi'}>
          <ol>
            {quizData.map((question: Question) => {
              return (
                <>
                  <li key={question.questionId}>{question.questionText}</li>
                  {question.answers.map((answer) => {
                    return (
                      <>
                        <input
                          key={answer}
                          type="radio"
                          id="1"
                          name={question.questionText}
                          value={answer}
                          // onChange={e => setIsCorrect(e.target.value)}
                        ></input>
                        <label>{answer}</label>
                        <br />
                      </>
                    )
                  })}
                </>
              )
            })}
          </ol>
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}
export default Quiz

// / {question.answers.map( answer => {
//   return <label></label>
//   <input type="radio" id='1' name="fav_language" value={answers[key]}></input>
// })}

// {
//   /* method="post" action='/quizresultspage' */
// }
// {
//   /*{quizData.map(quizElement => {
//   <li>{quizElement.question_text}
//     {Object.keys(element).forEach(key => {
//       <input type="radio" id='1' name="fav_language" value={answers[key]}>
//     <label for="javascript">JavaScript</label>
//     })}

//   </li>

// })}
// <button>Submit</button>
// </form> */
// }

// const [results, setResults] = useState([])

// const handleSubmit = (evt) => {
//   evt.preventDefault()
//   setResults([...results, results])
// setNewScare({
//   name: '',
//   rating: '',
//   origin: '',
//   lastScare: '',
// })
// }
