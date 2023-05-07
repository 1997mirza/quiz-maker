import styled from "styled-components";
import ProjectPrimaryButton from "../components/shared/projectPrimaryButton";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import BrainLogo from "../assets/brain-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataProvider";

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
      console.log("nema kviza");
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

  if (!quiz) return null;

  return (
    <Container>
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
              <ProjectPrimaryButton text={"Explore more quizzes"} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Carousel ref={carouselRef} autoplay={false} dots={false}>
            {quiz?.questions &&
              quiz.questions.map((el: any, index) => (
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              onClick={() => {
                if (carouselIndex === 0) return;
                setCarouselIndex(carouselIndex - 1);
                carouselRef.current?.prev();
              }}
            >
              <ProjectPrimaryButton
                isDisabled={carouselIndex === 0}
                text={"Previous question"}
              />
            </div>
            {!quiz.questions[carouselIndex].isAnswerShown && (
              <div onClick={() => updateAnswerStatus(carouselIndex)}>
                <ProjectPrimaryButton text={"Prikazi odgovor"} />
              </div>
            )}
            {carouselIndex + 1 < quiz.questions.length ? (
              <div
                onClick={() => {
                  setCarouselIndex(carouselIndex + 1);
                  carouselRef.current?.next();
                }}
              >
                <ProjectPrimaryButton text={"Next question"} />
              </div>
            ) : (
              <div onClick={() => setIsQuizFinished(true)}>
                <ProjectPrimaryButton text={"Finish quiz"} />
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 1180px;
  margin: auto;
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
