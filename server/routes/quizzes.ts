import express from 'express'
import * as db from '../db/quizzes.ts'
import { Answers, Randomization} from '../../models/quiz.ts'
import { QuestionData } from '../../models/question.ts'
import { QueryObserverOptions } from '@tanstack/react-query'
const router = express.Router()
// create a model for quiz data
// first create an array of objects of keys () and random numbers
// then sort the objects by random number value
// then use the indexes to access the particular 



function shuffleAnswers(question:QuestionData):string[]{
  console.log(question)
 const answerKeyArray = ['correctAnswer', 'incorrectAnswer1','incorrectAnswer2',
  'incorrectAnswer3']
  let randomization:Randomization[]= answerKeyArray.map((answerKey)=>{
    return { answerKey: answerKey, randomNumber: Math.random() }}
  )
  console.log(randomization)
  randomization.sort((element1:Randomization, element2:Randomization) => 
    element2.randomNumber - element1.randomNumber
  )
  // randomised actual answers according to the above array order
  let randomizedAnswerArray = randomization.map((randomAnswerKey)=>{
    return question[randomAnswerKey.answerKey]
  })
  // filter out the blank values
  randomizedAnswerArray = randomizedAnswerArray.filter(value => value !== '');
  console.log(randomizedAnswerArray)
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
    const quizDBData = await db.getSingleQuizQuestions(id)
    console.log(quizDBData)

    const quizData = quizDBData.map((question) => {
      console.log('this is the question data')
      // console.log(question)
    
      let shuffledAnswers = shuffleAnswers(question)

      // let secureQuizData = {
      //   quizName: question.quizName,
      //   quizId: question.quizId,
      //   questionId: question.questionId,
      //   questionText: question.questionText,
      //   answers:[]}
      
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
