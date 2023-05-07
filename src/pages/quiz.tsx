import styled from "styled-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import BrainLogo from "../assets/brain-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataProvider";
import {
  Container,
  ProjectPrimaryButton,
} from "../components/shared/utilities";
import { Question } from "../../types/question";

interface ExtendedQuestion extends Question {
  isAnswerShown: boolean;
}

export default function QuizSlider() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quiz, setQuiz] = useState<{
    id: number;
    name: string;
    questions: {
      id: number;
      question: string;
      answer: string;
      isAnswerShown: boolean;
    }[];
  }>();

  const carouselRef = useRef<CarouselRef>(null);
  const { getQuizWithQuestions } = useContext(DataContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const originalObject = getQuizWithQuestions(parseInt(params?.id as string));
    if (!originalObject) {
      setTimeout(() => {
        navigate("/");
      }, 3500);
      return;
    }
    if (!originalObject) return;
    const updatedQuestions = originalObject?.questions.map((q) => ({
      ...q,
      isAnswerShown: false,
    }));
    setQuiz({
      ...originalObject,
      questions: updatedQuestions as {
        id: number;
        question: string;
        answer: string;
        isAnswerShown: boolean;
      }[],
    });
  }, []);

  const updateAnswerStatus = (carouselIndex: number) => {
    if (quiz) {
      setQuiz((prevState) => {
        if (prevState) {
          const updatedQuestions = [...prevState.questions];
          updatedQuestions[carouselIndex] = {
            ...updatedQuestions[carouselIndex],
            isAnswerShown: true,
          };
          return { ...prevState, questions: updatedQuestions };
        }
      });
    }
  };

  if (!quiz)
    return (
      <CustomContainer style={{ textAlign: "center" }}>
        <h3 style={{ color: "white" }}>
          The quiz was not found. You will be redirected to the homepage.
        </h3>
      </CustomContainer>
    );
  return (
    <CustomContainer>
      {!isQuizFinished && (
        <h2 style={{ color: "white", marginTop: "0" }}>{quiz.name}</h2>
      )}
      {isQuizFinished ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: "150px", height: "150px" }}
              src={BrainLogo}
              alt="quiz-logo"
            />
            <h3 style={{ color: "white" }}>
              Congratulations on completing the quiz! Test your knowledge with
              more quizzes. Click below to explore and challenge yourself.
            </h3>
            <div onClick={() => navigate("/")}>
              <ProjectPrimaryButton>Explore more quizzes</ProjectPrimaryButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Carousel ref={carouselRef} autoplay={false} dots={false}>
            {quiz?.questions &&
              quiz.questions.map((el: ExtendedQuestion, index) => (
                <div key={index} style={{ marginLeft: "1px" }}>
                  <div style={{ color: "white" }}>
                    Question{` ${index + 1}/${quiz.questions.length}`}
                  </div>
                  <QuestionArea>{el.question}</QuestionArea>
                  {quiz.questions && quiz.questions[index].isAnswerShown && (
                    <QuestionArea style={{ marginTop: "10px" }}>
                      {el.answer}
                    </QuestionArea>
                  )}
                </div>
              ))}
          </Carousel>
          <ButtonContainer>
            <ProjectPrimaryButton
              onClick={() => {
                if (carouselIndex === 0) return;
                setCarouselIndex(carouselIndex - 1);
                carouselRef.current?.prev();
              }}
              disabled={carouselIndex === 0}
            >
              Previous question
            </ProjectPrimaryButton>
            {!quiz.questions[carouselIndex].isAnswerShown && (
              <ProjectPrimaryButton
                onClick={() => updateAnswerStatus(carouselIndex)}
              >
                Show answer
              </ProjectPrimaryButton>
            )}
            {carouselIndex + 1 < quiz.questions.length ? (
              <ProjectPrimaryButton
                onClick={() => {
                  setCarouselIndex(carouselIndex + 1);
                  carouselRef.current?.next();
                }}
              >
                Next question
              </ProjectPrimaryButton>
            ) : (
              <ProjectPrimaryButton onClick={() => setIsQuizFinished(true)}>
                Finish quiz
              </ProjectPrimaryButton>
            )}
          </ButtonContainer>
        </>
      )}
    </CustomContainer>
  );
}

const CustomContainer = styled(Container)`
  .slick-slide {
    overflow: hidden !important;
  }
`;
const QuestionArea = styled.div`
  width: auto;
  background-color: snow;
  border: 1px solid #d73b21;
  padding: 20px;
  border-radius: 8px;
  margin-left: 1px;
  margin-right: 1px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
