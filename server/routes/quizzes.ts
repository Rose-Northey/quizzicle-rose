import express from 'express'
import { addNewQuiz } from '../db/quizzes'

const router = express.Router()

// GET /api/v1/quizzes
router.get('/', async (req, res) => {
  res.json({})
})


// POST /api/v1/quizzes
router.post('/', async (req,res)=>{
  const {quizName, isPublic} = req.body
  const newQuizEntry = { 
    quizName,
    lastUpdated: new Date(),
    isPublic
  }
  try{
    const newQuizData = await addNewQuiz(newQuizEntry)
    const id = newQuizData[0].quiz_id
    res.status(200).json(id)
    
  }catch(error){
    console.log(error)
    res.status(500).send('could not add new quiz')
  }
})


export default router
