import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from './api.ts'

export function useQuizzes() {
  const query = useQuery({
    queryKey: ['quizzes'],
    queryFn: API.getQuizzes,
  })

  return {
    ...query,
    // update: useUpdateQuiz(),
    // delete: useDeleteQuiz(),
    // add: useAddQuiz(),
  }
}

export function useQuizMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes'])
    },
  })

  return mutation
}

// export function useUpdateQuiz() {
//   return useQuizMutation(API.updateQuiz)
// }

// export function useDeleteQuiz() {
//   return useQuizMutation(API.deleteQuiz)
// }

// export function useAddQuiz() {
//   return useQuizMutation(API.addQuiz)
// }
