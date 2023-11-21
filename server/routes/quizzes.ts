import express from 'express'
import { addNewQuiz } from '../db/quizzes'

const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  res.json({})
})


// GET /api/v1/quizzes/new
router.post('/new', async (req,res)=>{
  const {quizName, isPublic} = req.body
  if (!quizName){
    res.status(400).send('Oops, a quiz must have a name!')
  }
  const newQuizEntry = { 
    quizName,
    lastUpdated: new Date(),
    isPublic
  }
  try{
    const newQuizData = await addNewQuiz(newQuizEntry)
    res.status(200).json(newQuizData)
  }catch(error){
    console.log(error)
    res.status(500).send('could not add new quiz')
  }
})


export default router
