import React, { createContext, useState, ReactNode } from "react";
import { Quiz } from "../types/quiz";

interface MyProviderProps {
  children: ReactNode;
}

interface ContextProps {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
}
const DataContext = createContext<ContextProps>({} as ContextProps);

const DataProvider = ({ children }: MyProviderProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "1",
      name: "Novogodisnj kviz",
      questions: [
        {
          id: "1",
          question: "Koliko je necega",
          answer: "Previse",
        },
      ],
    },
    {
      id: "2",
      name: "Kviz znanja",
      questions: [
        {
          id: "2",
          question: "Pitanje 2",
          answer: "Odgovor 2",
        },
      ],
    },
  ]);

  return (
    <DataContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
