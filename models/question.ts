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
  quizName?: string
  questionText: string
  answers: string[]
}

export interface QuestionData {
  questionText: string
  correctAnswer: string
  incorrectAnswer1: string
  incorrectAnswer2?: string
  incorrectAnswer3?: string
}

export interface SelectedAnswer {
  [key: number]: string
}
