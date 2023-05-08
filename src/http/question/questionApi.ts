import { apiClient } from "../client";
import { Question } from "../../../types/question";
export const QuestionApi = {
  getQuestions: () => apiClient.get<Question[]>("/questions"),
};
