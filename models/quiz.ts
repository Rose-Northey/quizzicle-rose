export interface QuizSnakeCase {
  quiz_id: number
  quiz_name: string
  last_updated: Date
  is_public: boolean
  author_id?: string
}

export interface Quiz {
  quizId: number
  quizName: string
  lastUpdated: Date
  isPublic: boolean
  authorId?: string
}

export interface QuizData {
  quizName: string
  lastUpdated: Date
  isPublic: boolean
  authorId?: string
}

export interface NewQuizEntry {
  quizName: string
  lastUpdated: Date
  isPublic: boolean
}