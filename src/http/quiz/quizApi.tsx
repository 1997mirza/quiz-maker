import { apiClient } from "../client";
import { Quiz } from "../../../types/quiz";
export const QuizApi = {
  getQuizzes: () => apiClient.get<Quiz[]>("/quizzes"),
  getQuiz: (quizId: number) => apiClient.get<Quiz>(`/quizzes/${quizId}`),
  deleteQuiz: (quizId: number) => apiClient.delete(`/quizzes/${quizId}`),
  addQuiz: (quiz: Quiz) =>
    apiClient.post(`/quizzes`, {
      data: quiz,
    }),
  editQuiz: (quiz: Quiz, id: number) => apiClient.put(`/quizzes/${id}`),
};
