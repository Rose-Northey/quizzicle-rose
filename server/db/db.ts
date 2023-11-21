import connection from "../db/connection"
import { QuestionData } from "../../models/question"
import {Quiz} from "../../models/quiz"

export function insertQuestion(quiz_id:number,question:QuestionData){
  console.log({quiz_id,question})
  return connection('questions').insert({quiz_id,...question}).returning(["quiz_id","question_text","correct_answer","incorrect_answer1","incorrect_answer2","incorrect_answer3"])
}