export interface QuestionSnakeCase {
  question_id: number
  quiz_id: number
  question_text: string
  correct_answer: string
  incorrect_answer1: string
  incorrect_answer2?: string
  incorrect_answer3?: string
}

export interface Question {
  questionId: number
  quizId: number
  questionText: string
  correctAnswer: string
  incorrectAnswer1: string
  incorrectAnswer2?: string
  incorrectAnswer3?: string
}

export interface QuestionData {
  quizId: number
  questionText: string
  correctAnswer: string
  incorrectAnswer1: string
  incorrectAnswer2?: string
  incorrectAnswer3?: string
}
