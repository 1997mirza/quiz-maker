import React, { createContext, useState, ReactNode } from "react";
import { Quiz } from "../types/quiz";
import { Question } from "../types/question";
import { NewQuizProps } from "./pages/create-new";

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
  addNewQuiz: (quiz: NewQuizProps, isEditing?: number) => void;
}

interface ExtendedQuestion extends Question {
  type: "new" | "existing";
}
const DataContext = createContext<ContextProps>({} as ContextProps);

const DataProvider = ({ children }: MyProviderProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      name: "Sportske legende",
      questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 2,
      name: "Informatika",
      questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      id: 3,
      name: "Mozgalice",
      questions: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    },
    {
      id: 4,
      name: "Opca kultura",
      questions: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    },
    {
      id: 5,
      name: "Random 1",
      questions: [1, 22, 13, 5],
    },
    {
      id: 6,
      name: "Random 2",
      questions: [1, 22, 13, 16],
    },
    {
      id: 7,
      name: "Random 3",
      questions: [1, 22, 13, 8],
    },
    {
      id: 8,
      name: "Random 4",
      questions: [1, 9, 10, 37],
    },
    {
      id: 9,
      name: "Random 5",
      questions: [1, 35, 4, 1],
    },
    {
      id: 10,
      name: "Random 6",
      questions: [6, 12, 13, 33],
    },
    {
      id: 11,
      name: "Random 7",
      questions: [5, 4, 1, 24],
    },
    {
      id: 12,
      name: "Random 8",
      questions: [7, 5, 34, 39],
    },
  ]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question:
        "Koja teniserka ima najviše osvojenih Grand Slam turnira u singlu u istoriji tenisa?",
      answer: "Serena Williams sa 23 osvojena Grand Slam titule",
    },
    {
      id: 2,
      question:
        "Koja atletičarka je držala svjetski rekord u skoku u dalj najduže u istoriji?",
      answer:
        "Galina Čistjakova sa skokom od 7.52m koji je držao od 1988. do 2018. godine.",
    },
    {
      id: 3,
      question:
        "Koja je zemlja osvojila najviše medalja u istoriji Olimpijskih igara?",
      answer: "SAD sa vise od 2,500 osvojene medalje.",
    },
    {
      id: 4,
      question:
        "Ko je najbrži trkač na 100 metara u istoriji atletike i koliko je brzo trčao?",
      answer: "Usain Bolt sa vremenom od 9.58 sekundi.",
    },
    {
      id: 5,
      question:
        "Ko je najuspješniji vozač u istoriji Formule 1 i koliko šampionata je osvojio?",
      answer: "Michael Schumacher sa sedam osvojenih šampionata.",
    },
    {
      id: 6,
      question:
        "Ko je najbolji strijelac u istoriji nogometa i koliko golova je postigao?",
      answer: "Josef Bican sa preko 805 postignutih golova u svojoj karijeri.",
    },
    {
      id: 7,
      question:
        "Ko je najuspješniji teniser svih vremena po broju osvojenih Grand Slam titula u singlu i koliko ih je osvojio?",
      answer: "Roger Federer sa 20 osvojenih Grand Slam titula.",
    },
    {
      id: 8,
      question:
        "Koja zemlja je osvojila najviše zlatnih medalja u istoriji Zimskih olimpijskih igara?",
      answer: "Norveška sa 132 osvojene zlatne medalje.",
    },
    {
      id: 9,
      question:
        "Koja košarkaška legenda je osvojila najviše NBA prstenova u istoriji i koliko ih ima?",
      answer: "Bill Russell sa 11 osvojenih NBA prstenova.",
    },
    {
      id: 10,
      question:
        "Koja plivačica drži svjetski rekord u disciplini 50m slobodnim stilom i koliko brzo je plivala?",
      answer: "Sarah Sjöström sa vremenom od 23.67 sekundi.",
    },
    {
      id: 11,
      question: "Koje je ime prvog programskog jezika?",
      answer: "Fortran",
    },
    {
      id: 12,
      question: "Koje su tri osnovne paradigme programiranja?",
      answer: "Strukturno, objektno i funkcionalno programiranje",
    },
    {
      id: 13,
      question: "Koja se programska paradigma koristi u React-u?",
      answer: "Deklarativno programiranje",
    },
    {
      id: 14,
      question: "Šta predstavlja skraćenica AJAX?",
      answer: "Asynchronous JavaScript and XML",
    },
    {
      id: 15,
      question: "Koja je složenost binarne pretrage?",
      answer: "O(log n)",
    },
    {
      id: 16,
      question: "Šta predstavlja skraćenica SQL?",
      answer: "Structured Query Language",
    },
    {
      id: 17,
      question: "Šta je to Big O notaicja?",
      answer: "Notacija kojom se opisuje složenost algoritama",
    },
    {
      id: 18,
      question: "Koja je složenost algoritma bubble sort?",
      answer: "O(n^2)",
    },
    {
      id: 19,
      question: "Koja se programska paradigma koristi u Angular-u?",
      answer: "Objektno orijentisano programiranje",
    },
    {
      id: 20,
      question: "Šta predstavlja skraćenica REST?",
      answer: "Representational State Transfer",
    },
    {
      id: 21,
      question:
        "Što je to što svi imaju, a najčešće se koristi kad je čovjek mrtav?",
      answer: "Ime",
    },
    {
      id: 22,
      question:
        "Koje slovo engleske abecede se ne pojavljuje u nazivu nijedne od država svijeta?",
      answer: "Q",
    },
    {
      id: 23,
      question:
        "Što se događa jednom u minutu, dvaput u trenu, a nikada u tisućljeću?",
      answer: "Slovo M",
    },
    {
      id: 24,
      question: "Što teče bez da se mičemo?",
      answer: "Vrijeme",
    },
    {
      id: 25,
      question: "Koliko je puta moguće presaviti papir na pola?",
      answer: "Najviše 7 puta",
    },
    {
      id: 26,
      question: "Koje se tri riječi najčešće koriste u engleskom jeziku?",
      answer: "I, you, the",
    },
    {
      id: 27,
      question:
        "Koja životinja u engleskom jeziku počinje s tri ista slova kao i kraj engleskog alfabeta?",
      answer: "Zebra",
    },
    {
      id: 28,
      question: "Koja se riječ u engleskom jeziku sastoji od svih suglasnika?",
      answer: "Rhythm",
    },
    {
      id: 29,
      question: "Koliko je rupa na klasičnoj švicarskoj vojnoj nožici?",
      answer: "12",
    },
    {
      id: 30,
      question: "Kako se zove proces kojim se odvoje miješane tvari?",
      answer: "Destilacija",
    },
    {
      id: 31,
      question: "Ko je napisao roman 'Rat i mir'?",
      answer: "Lav Nikolajevič Tolstoj",
    },
    {
      id: 32,
      question: "Ko je napisao dramu 'Hamlet'?",
      answer: "William Shakespeare",
    },
    {
      id: 33,
      question: "Ko je autor knjige 'Sumnjivo lice'?",
      answer: "Branislav Nušić",
    },
    {
      id: 34,
      question: "Ko je prvi čovjek koji je zakoračio na Mjesec?",
      answer: "Neil Armstrong",
    },
    {
      id: 35,
      question: "Kako se zove najveći kontinent na Zemlji?",
      answer: "Azija",
    },
    {
      id: 36,
      question: "Ko je napisao knjigu '1984'?",
      answer: "George Orwell",
    },
    {
      id: 37,
      question: "Ko je bio prvi predsjednik SAD-a?",
      answer: "George Washington",
    },
    {
      id: 38,
      question: "Ko je izumio telefon?",
      answer: "Alexander Graham Bell",
    },
    {
      id: 39,
      question: "Ko je bio vođa Oktobarske revolucije u Rusiji?",
      answer: "Vladimir Ilič Lenjin",
    },
    {
      id: 40,
      question: "Koje godine je počeo Drugi svjetski rat?",
      answer: "1939",
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

  const addNewQuiz = (quiz: NewQuizProps, isEditing?: number) => {
    const newQuiz: Quiz = {
      id: isEditing
        ? isEditing
        : quizzes.length > 0
        ? quizzes[quizzes.length - 1].id + 1
        : 1,
      name: quiz?.name,
      questions: [],
    };
    const potentialModifiedQuestions: ExtendedQuestion[] = [];
    const copyOfQuestions = questions;

    quiz.questions.forEach((question: any) => {
      if (question.type === "existing") {
        newQuiz.questions.push(question.id);
      } else {
        //If there is an ID, then it's an existing question, just check if it's been modified.
        if (question.id) {
          potentialModifiedQuestions.push(question);
          newQuiz.questions.push(question.id);
        } else {
          copyOfQuestions.push({
            id: copyOfQuestions[copyOfQuestions.length - 1].id + 1,
            question: question.question,
            answer: question.answer,
          });
          newQuiz.questions.push(
            copyOfQuestions[copyOfQuestions.length - 1].id
          );
        }
      }
    });

    if (!!isEditing) {
      const updatedQuestion = copyOfQuestions.map((question: Question) => {
        const newQuestion = potentialModifiedQuestions.find(
          (q: any) => q.id === question.id
        );
        if (newQuestion) {
          return {
            id: newQuestion.id,
            question: newQuestion.question,
            answer: newQuestion.answer,
          };
        }
        return question;
      });
      setQuestions(updatedQuestion);
    }
    if (!!isEditing) {
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
    return quizzes.find((quiz) => quiz.id === quizId);
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
