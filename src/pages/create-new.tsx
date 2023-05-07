import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DataContext } from "../DataProvider";
import { CloseCircleOutlined } from "@ant-design/icons";
import ProjectPrimaryButton from "../components/shared/projectPrimaryButton";
import BrainLogo from "../assets/brain-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Question } from "../../types/question";

interface QuizQuestion {
  type: "existing" | "new";
  id?: number;
  question?: string;
  answer?: string;
}

interface newQuizProps {
  name?: string;
  questions: QuizQuestion[];
}

export default function CreateNew() {
  const { existingQuestions, addNewQuiz, getQuiz } = useContext(DataContext);
  const [isQuizAdded, setIsQuizAdded] = useState(false);
  const [questions, setQuestions] =
    useState<{ value: number; label: string }[]>();
  const [newQuiz, setNewQuiz] = useState<newQuizProps>({
    name: undefined,
    questions: [],
  });

  const router = useLocation();
  const currentRoute = router.pathname;
  const isEditing = currentRoute.includes("edit");
  const params = useParams();

  const [errors, setErrors] = useState<boolean[]>([]);
  const [hasName, setHasName] = useState(true);
  const navigate = useNavigate();
  const onChange = (value: number, index: number) => {
    console.log("value", value, "index", index);
    const alreadySelected = newQuiz.questions.some(
      (question) => question.id === value
    );
    if (alreadySelected)
      message.warning("The selected question is already in the quiz.");
    const newQuestions = newQuiz.questions;
    newQuestions[index].id = value;
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: newQuestions,
    }));
  };

  const getQuestionById = (questionId: number) => {
    console.log("question od", questionId);
    return existingQuestions?.find((question) => question.id === questionId);
  };

  useEffect(() => {
    if (isEditing) {
      const quizForEdit = getQuiz(parseInt(params?.id as string));
      console.log("quiz", quizForEdit);
      if (!quizForEdit) {
        message.error("Quiz not found");
      } else {
        setNewQuiz({
          name: quizForEdit.name,
          questions: quizForEdit.questions.map((index: number) => {
            return {
              type: "new",
              question: getQuestionById(index)?.question,
              answer: getQuestionById(index)?.answer,
              id: getQuestionById(index)?.id,
            };
          }),
        });
      }
    }
    setQuestions(
      existingQuestions.map((item) => ({
        value: item.id,
        label: item.question,
      }))
    );
  }, []);

  const onChangeTextArea = (value: string, index: number) => {
    const newQuestions = newQuiz.questions;
    newQuestions[index].question = value;
    setNewQuiz((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };
  const onChangeTextAreaAnswer = (value: string, index: number) => {
    const newQuestions = newQuiz.questions;
    newQuestions[index].answer = value;
    setNewQuiz((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const onValidate = () => {
    if (newQuiz.questions.length === 0) {
      message.error("The quiz must contain at least one question.");
      return;
    }

    setErrors([]);

    setHasName(!!newQuiz.name);
    if (!newQuiz.name) return;

    const errorArray: boolean[] = [];

    newQuiz.questions.map((question) => {
      if (
        (question.type === "existing" && !!question.id) ||
        (question.type === "new" && !!question.question && !!question.answer)
      ) {
        errorArray.push(false);
      } else {
        errorArray.push(true);
      }
    });

    setErrors(errorArray);

    if (errorArray.some((bool) => bool)) {
      return;
    } else {
      console.log("ovdje sma");
      addNewQuiz(newQuiz, parseInt(params?.id as string));
      setIsQuizAdded(true);
    }
  };

  return (
    <Container>
      {isQuizAdded ? (
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ color: "white", marginTop: "0" }}>Create new Quiz</h2>
            <h2 style={{ color: "white", marginTop: "0" }}>
              Question Count: {newQuiz.questions.length}
            </h2>
          </div>
          <p style={{ color: "white" }}>Quiz Name:</p>
          <Input
            value={newQuiz.name}
            onChange={(e) => {
              setNewQuiz((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
          {!hasName && <p style={{ color: "red" }}>* This field is required</p>}
          {newQuiz.questions.map((question: any, indexGlobal) => {
            if (question.type === "existing") {
              return (
                <div key={indexGlobal}>
                  <div
                    key={indexGlobal}
                    style={{ marginTop: "10px", display: "flex" }}
                  >
                    <Select
                      style={{ width: "100%" }}
                      showSearch
                      placeholder="Select a question"
                      optionFilterProp="children"
                      onChange={(e) => {
                        onChange(e, indexGlobal);
                      }}
                      options={questions}
                      value={newQuiz.questions[indexGlobal].id}
                    />
                    <Button
                      style={{ marginLeft: "10px" }}
                      type="primary"
                      onClick={() => {
                        setNewQuiz((prevQuiz) => ({
                          ...prevQuiz,
                          questions: prevQuiz.questions.filter(
                            (question, index) => index !== indexGlobal
                          ),
                        }));
                        if (errors.length > 0) {
                          setErrors((prevErrors) =>
                            prevErrors.filter(
                              (error, index) => index !== indexGlobal
                            )
                          );
                        }
                      }}
                      icon={<CloseCircleOutlined />}
                    ></Button>
                  </div>
                  {errors[indexGlobal] && (
                    <p style={{ color: "red" }}>
                      * Please select a question or remove the row.
                    </p>
                  )}
                </div>
              );
            } else {
              return (
                <div key={indexGlobal}>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <TextArea
                        style={{ width: "75%", marginRight: "10px" }}
                        placeholder={"Your question"}
                        onChange={(e) => {
                          onChangeTextArea(e.target.value, indexGlobal);
                        }}
                        value={newQuiz.questions[indexGlobal].question}
                      />
                      <TextArea
                        onChange={(e) => {
                          onChangeTextAreaAnswer(e.target.value, indexGlobal);
                        }}
                        style={{ width: "25%" }}
                        placeholder={"Your answer"}
                        value={newQuiz.questions[indexGlobal].answer}
                      />
                    </div>
                    <Button
                      style={{ marginLeft: "10px" }}
                      type="primary"
                      onClick={() => {
                        setNewQuiz((prevQuiz) => ({
                          ...prevQuiz,
                          questions: prevQuiz.questions.filter(
                            (question, index) => index !== indexGlobal
                          ),
                        }));
                        if (errors.length > 0) {
                          setErrors((prevErrors) =>
                            prevErrors.filter(
                              (error, index) => index !== indexGlobal
                            )
                          );
                        }
                      }}
                      icon={<CloseCircleOutlined />}
                    ></Button>
                  </div>
                  {errors[indexGlobal] && (
                    <p style={{ color: "red" }}>* Bouth fields are required</p>
                  )}
                </div>
              );
            }
          })}
          <AddQuestionOptionsContainer>
            <Option1
              onClick={() => {
                setNewQuiz((prevQuiz) => ({
                  ...prevQuiz,
                  questions: [
                    ...prevQuiz.questions,
                    { type: "new", question: undefined, answer: undefined },
                  ],
                }));
              }}
            >
              Add new Question
            </Option1>
            <Option2
              onClick={() => {
                setNewQuiz((prevQuiz) => ({
                  ...prevQuiz,
                  questions: [
                    ...prevQuiz.questions,
                    { type: "existing", id: undefined },
                  ],
                }));
              }}
            >
              Choose existing question
            </Option2>
          </AddQuestionOptionsContainer>
          <div onClick={() => onValidate()}>
            <ProjectPrimaryButton text={"Add quiz"} />
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 1180px;
  margin: auto;
  label {
    color: white !important;
  }
  .ant-row {
    display: unset !important;
  }
`;
const AddQuestionOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  height: 32px;
  margin-top: 10px;
`;
const Option1 = styled.div`
  width: 50%;
  background-color: white;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  text-align: center;
  color: #d73b21;
  padding-top: 4px;
  cursor: pointer;
`;
const Option2 = styled.div`
  width: 50%;
  background-color: #d73b21;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  text-align: center;
  color: white;
  padding-top: 4px;
  cursor: pointer;
`;
