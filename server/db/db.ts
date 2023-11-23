import connection from "../db/connection"
import { QuestionData } from "../../models/question"


export function insertQuestion(quiz_id:number,question:QuestionData){
  console.log(quiz_id,question)
  const snakeQuestion = {
    question_text: question.questionText,
    correct_answer: question.correctAnswer,
    incorrect_answer1: question.incorrectAnswer1,
    incorrect_answer2: question.incorrectAnswer2,
    incorrect_answer3: question.incorrectAnswer3
  }
  return connection('questions').insert({quiz_id,...snakeQuestion}).returning(["quiz_id","question_text","correct_answer","incorrect_answer1","incorrect_answer2","incorrect_answer3"])
}

export function getQuizNameById(quiz_id:number){
  return connection('quizzes').select("quiz_name").where("quiz_id",quiz_id).first()
}