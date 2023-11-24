import express from 'express'
import { getCorrectAnswersByQuizId } from '../db/quizzes'
import { insertQuestion } from '../db/questionsDb'

const router = express.Router()

// http://localhost:5173/api/v1/results/:quizId

router.post('/:quizId', async (req, res) => {
  const quizId = parseInt(req.params.quizId)
  const selectedAnswers = req.body
  console.log('hey, it ran through the server API!')
  console.log(selectedAnswers)

  try {
    const answersObj = await getCorrectAnswersByQuizId(quizId)
    const correctAnswers = answersObj.map((obj)=>{
      return obj.correctAnswer
    })

    const results ={
      score: 0,
      questionCount:0
    }
    correctAnswers.map((correctAnswer, index) => {
      results.questionCount++
      if (correctAnswer === selectedAnswers[index]) {
        results.score++
      }
    })
    console.log(results)


   
    if (!correctAnswers) {
      res.sendStatus(404)
      return
    }

    res.json(correctAnswers)

  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get answers')
  }
})

export default router