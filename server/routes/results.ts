import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'
import { insertQuestion } from '../db/questionsDb'

const router = express.Router()










// I need to hand this route the client selected answers
// http://localhost:5173/api/v1/results/:quizId

router.post('/:quizId', async (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const selectedAnswers = req.body
  console.log('hey, it ran through the server API!')
  console.log(selectedAnswers)

  try {
    const answersObj = await getCorrectAnswersByQuizId(quizId)
    const answers = answersObj.map((obj)=>{
      return obj.correctAnswer
    })

    console.log(answers)
    if (!answers) {
      res.sendStatus(404)
      return
    }

    res.json(answers)

  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get answers')
  }
})

export default router