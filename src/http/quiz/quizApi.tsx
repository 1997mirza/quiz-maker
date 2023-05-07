import { apiClient } from "../client";
import { Quiz } from "../../../types/quiz";
export const QuizApi = {
  getQuizzes: () => apiClient.get<Quiz[]>("/quizzes"),
};
