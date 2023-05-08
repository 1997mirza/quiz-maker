import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Carousel, Spin } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import BrainLogo from "../assets/brain-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  ProjectPrimaryButton,
} from "../components/shared/utilities";
import { Question } from "../../types/question";
import { QuizApi } from "../http/quiz/quizApi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const carouselRef = useRef<CarouselRef>(null);
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await QuizApi.getQuiz(parseInt(params?.id as string));
      const updatedQuestions = res.data.questions.map((q) => ({
        ...q,
        isAnswerShown: false,
      }));
      setQuiz({
        ...res.data,
        questions: updatedQuestions as {
          id: number;
          question: string;
          answer: string;
          isAnswerShown: boolean;
        }[],
      });
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  if (isLoading || !!error)
    return (
      <CustomContainer style={{ textAlign: "center" }}>
        {isLoading ? (
          <Spin spinning={true} />
        ) : (
          <h3 style={{ color: "red" }}>{error}</h3>
        )}
      </CustomContainer>
    );
  if (!quiz) return null;
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
            {!quiz?.questions[carouselIndex].isAnswerShown && (
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
