import connection from "./connection";
import * as db from '../db/questionsDb'
import { beforeEach, beforeAll, afterAll, describe, it, expect, vi } from 'vitest'

import { insertQuestion } from "./questionsDb";
import { mock } from "node:test";

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})




it("successfully inserted a question",async()=>{
  const mockNewQuestion={
    questionText:"test question",
    correctAnswer: "test correct answer",
    incorrectAnswer1: "test incorrect answer1",
    incorrectAnswer2: "test incorrect answer2",
    incorrectAnswer3: "test incorrect answer3"
  }
  const result = await insertQuestion(1,mockNewQuestion)
  expect(result[0].question_text).toBe(mockNewQuestion.questionText)
})


afterAll(async () => {
  await connection.destroy()
})