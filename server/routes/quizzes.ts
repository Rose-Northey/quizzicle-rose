import express from 'express'
import * as db from '../db/quizzes.ts'
import { Randomization} from '../../models/quiz.ts'
import { QuestionData, Question, QuizData} from '../../models/question.ts'
const router = express.Router()

function shuffleAnswers(question:QuestionData):string[]{
 const answerKeyArray = ['correctAnswer', 'incorrectAnswer1','incorrectAnswer2',
  'incorrectAnswer3']
  let randomization:Randomization[]= answerKeyArray.map((answerKey)=>{
    return { answerKey: answerKey, randomNumber: Math.random() }}
  )
  randomization.sort((element1:Randomization, element2:Randomization) => 
    element2.randomNumber - element1.randomNumber
  )
  // randomised actual answers according to the above array order
  let randomizedAnswerArray = randomization.map((randomAnswerKey)=>{
    return question[randomAnswerKey.answerKey]
  })
  // filter out the blank values
  randomizedAnswerArray = randomizedAnswerArray.filter(value => value !== '');
  return randomizedAnswerArray
}

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await db.getQuizzes()
    res.json(quizzes)
  } catch (err) {
    res.status(500).send('Could not get Quizzes')
  }
})

router.get('/:quiz_id', async (req, res) => {
  const id = Number(req.params.quiz_id)

  try {
    const quizDBData: Question[] = await db.getSingleQuizQuestions(id)

    const quizData: QuizData[] = quizDBData.map((question: Question[]) => {
        return (
         { quizName: question.quizName,
        quizId: question.quizId,
        questionId: question.questionId,
        questionText: question.questionText,
        answers:shuffleAnswers(question)}
        )
    })

    res.json(quizData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Rats! Somthing went wrong!' })
  }
})

// POST /api/v1/quizzes
router.post('/', async (req: express.Request, res: express.Response) => {
  const { quizName, isPublic } = req.body
  const newQuizEntry = {
    quizName,
    lastUpdated: new Date(),
    isPublic,
  }
  try {
    const newQuizData = await db.addNewQuiz(newQuizEntry)

    const id = newQuizData[0].quiz_id
    res.status(200).json(id)
  } catch (error) {
    console.log(error)
    res.status(500).send('could not add new quiz')
  }
})

router.get('/name/:id', async (req, res) => {
  const quizId = Number(req.params.id)
  const response = await db.getQuizNameById(quizId)

  res.json(response)
})

export default router
