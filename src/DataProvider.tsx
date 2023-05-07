import React, { createContext, useState, ReactNode } from "react";
import { Quiz } from "../types/quiz";
import { Question } from "../types/question";
import { set } from "react-hook-form";

interface MyProviderProps {
  children: ReactNode;
}

interface ContextProps {
  quizzes: Quiz[];

  getQuiz: (quizId: number) => Quiz | undefined;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  deleteQuiz: (quizId: number) => void;
  getQuizWithQuestions: (quizId: number) =>
    | {
        id: number;
        name: string;
        questions: Question[];
      }
    | undefined;
  existingQuestions: Question[];
  addNewQuiz: (quiz: any, isEditing?: number) => void;
}
const DataContext = createContext<ContextProps>({} as ContextProps);

const DataProvider = ({ children }: MyProviderProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      name: "New Year's Quiz",
      questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 2,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 3,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 4,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 5,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 6,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 7,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 8,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 9,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 10,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 11,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 12,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 13,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 14,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 15,
      name: "Brain Teaser Quiz",
      questions: [1, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
  ]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question:
        "What is the most popular color associated with New Year's Eve celebrations?",
      answer: "Gold or silver",
    },
    {
      id: 2,
      question:
        "In what year did the first New Year's Eve celebration take place in Times Square, New York City?",
      answer: "1904",
    },
    {
      id: 3,
      question:
        "What is the name of the traditional Scottish New Year's Eve celebration?",
      answer: "Hogmanay",
    },
    {
      id: 4,
      question:
        "What famous song is traditionally sung at the stroke of midnight on New Year's Eve?",
      answer: "Auld Lang Syne",
    },
    {
      id: 5,
      question:
        "What fruit is traditionally eaten at New Year's in Spain and some Latin American countries?",
      answer: "Grapes",
    },
    {
      id: 6,
      question:
        "In many cultures, it is customary to make New Year's resolutions. What is the most common resolution made in the United States?",
      answer: "To exercise more and lose weight",
    },
    {
      id: 7,
      question:
        "What is the name of the traditional Japanese New Year's dish that is made with soba noodles?",
      answer: "Toshikoshi soba",
    },
    {
      id: 8,
      question:
        "In what year did the Tournament of Roses Parade first take place on New Year's Day in Pasadena, California?\n",
      answer: "1890",
    },
    {
      id: 9,
      question:
        "In which country is it traditional to give red envelopes filled with money to children on New Year's Day?",
      answer: "China",
    },
    {
      id: 10,
      question:
        "What is the name of the first person to greet visitors to your home on New Year's Day in Ireland?",
      answer: 'The "first footer" or "the lucky bird."',
    },
    {
      id: 11,
      question:
        "What starts with an E, ends with an E, but contains only one letter?",
      answer: "An envelope",
    },
    {
      id: 12,
      question: "What is always in front of you but can't be seen?",
      answer: "The future",
    },
    {
      id: 13,
      question:
        "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
      answer: "Fire",
    },
    {
      id: 14,
      question: "What has a heart that doesn't beat?",
      answer: "An artichoke",
    },
    { id: 15, question: "What gets wet while drying?", answer: "A towel" },
    {
      id: 16,
      question: "What has a head and a tail, but no body?",
      answer: "A coin",
    },
    {
      id: 17,
      question: "What is so fragile that saying its name breaks it?",
      answer: "Silence",
    },
    {
      id: 18,
      question:
        "What is black when you buy it, red when you use it, and gray when you throw it away?",
      answer: "Charcoal",
    },
    {
      id: 19,
      question: "What is full of holes but can hold water?",
      answer: "A sponge",
    },
    {
      id: 20,
      question: "What is something you will never see again?",
      answer: "Yesterday",
    },
  ]);
  const deleteQuiz = (quizId: number) => {
    const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);
    if (quizIndex !== -1) {
      setQuizzes([
        ...quizzes.slice(0, quizIndex),
        ...quizzes.slice(quizIndex + 1),
      ]);
    }
  };

  const getQuizWithQuestions = (
    quizId: number
  ): { id: number; name: string; questions: Question[] } | undefined => {
    const quiz = quizzes.find((quiz) => quiz.id === quizId);
    if (!quiz) {
      return undefined;
    }
    const quizQuestions = quiz.questions
      .map((id) => questions.find((question) => question.id === id))
      .filter((question) => question !== undefined) as Question[];
    if (quizQuestions.length === 0) {
      return undefined;
    }
    if (quizQuestions.length === 0) return undefined;
    return {
      id: quiz.id,
      name: quiz.name,
      questions: quizQuestions as Question[],
    };
  };

  const addNewQuiz = (quiz: any, isEditing?: number) => {
    console.log("evo kviza", quiz);
    const newQuiz: Quiz = {
      id: isEditing ?? quizzes[quizzes.length - 1].id + 1,
      name: quiz.name,
      questions: [],
    };
    const potentialModifiedQuestions: any = [];

    quiz.questions.map((question: any) => {
      if (question.type === "existing") {
        newQuiz.questions.push(question.id);
      } else {
        //If there is an ID, then it's an existing question, just check if it's been modified.
        if (question.id) {
          potentialModifiedQuestions.push(question);
          newQuiz.questions.push(question.id);
        } else {
          setQuestions((prevState) => [
            ...prevState,
            {
              id: questions[questions.length - 1].id + 1,
              question: question.question,
              answer: question.answer,
            },
          ]);
          newQuiz.questions.push(questions[questions.length - 1].id + 1);
        }
      }
    });
    if (!!isEditing) {
      const updatedQuestion = questions.map((question: Question) => {
        const newQuestion = potentialModifiedQuestions.find(
          (q: any) => q.id === question.id
        );
        if (newQuestion) {
          return newQuestion;
        }
        return question;
      });
      setQuestions(updatedQuestion);
    }
    console.log("gotovo", newQuiz);
    if (isEditing) {
      const updatedQuizzes = quizzes.map((el: Quiz) => {
        if (el.id === newQuiz.id) {
          return newQuiz;
        } else {
          return el;
        }
      });
      setQuizzes(updatedQuizzes);
    } else {
      setQuizzes((prevState) => [...prevState, newQuiz]);
    }
  };

  const getQuiz = (quizId: number) => {
    const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
    return selectedQuiz;
  };

  return (
    <DataContext.Provider
      value={{
        quizzes,
        setQuizzes,
        deleteQuiz,
        getQuizWithQuestions,
        existingQuestions: questions,
        addNewQuiz,
        getQuiz,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
