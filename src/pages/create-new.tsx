import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DataContext } from "../DataProvider";
import { CloseCircleOutlined } from "@ant-design/icons";
import BrainLogo from "../assets/brain-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Title,
  ProjectPrimaryButton,
} from "../components/shared/utilities";

interface QuizQuestion {
  type: "existing" | "new";
  id?: number;
  question?: string;
  answer?: string;
}

export interface NewQuizProps {
  name: string;
  questions: QuizQuestion[];
}

export default function CreateNew() {
  const { existingQuestions, addNewQuiz, getQuiz } = useContext(DataContext);
  const [isQuizAdded, setIsQuizAdded] = useState(false);
  const [questions, setQuestions] =
    useState<{ value: number; label: string }[]>();
  const [newQuiz, setNewQuiz] = useState<NewQuizProps>({
    name: "",
    questions: [],
  });
  const [quizFound, setQuizFound] = useState(false);

  const router = useLocation();
  const currentRoute = router.pathname;
  const isEditing = currentRoute.includes("edit");
  const params = useParams();

  const [errors, setErrors] = useState<boolean[]>([]);
  const [hasName, setHasName] = useState(true);
  const navigate = useNavigate();
  const onChange = (value: number, index: number) => {
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
    return existingQuestions?.find((question) => question.id === questionId);
  };

  useEffect(() => {
    if (isEditing) {
      const quizForEdit = getQuiz(parseInt(params?.id as string));
      setQuizFound(!!quizForEdit);
      if (!quizForEdit) {
        setTimeout(() => {
          navigate("/");
        }, 3500);
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

  const onChangeTextArea = (
    value: string,
    index: number,
    isQuestion?: boolean
  ) => {
    const newQuestions = newQuiz.questions;
    newQuestions[index][isQuestion ? "question" : "answer"] = value;
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
      addNewQuiz(newQuiz, parseInt(params?.id as string));
      setIsQuizAdded(true);
    }
  };

  if (isEditing && !quizFound) {
    return (
      <CustomContainer style={{ textAlign: "center" }}>
        <h3 style={{ color: "white" }}>
          The quiz was not found. You will be redirected to the homepage.
        </h3>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer>
      {isQuizAdded ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: "150px", height: "150px" }}
              src={BrainLogo}
              alt="quiz-logo"
            />
            <h3 style={{ color: "white" }}>
              Success! Your quiz has been {isEditing ? "edited" : "added"}.
            </h3>
            <ProjectPrimaryButton onClick={() => navigate("/")}>
              Go to Homepage
            </ProjectPrimaryButton>
          </div>
        </div>
      ) : (
        <>
          <TitleWrapper>
            <Title> {isEditing ? "Edit Quiz" : "Create new Quiz"}</Title>
            <Title>Question Count: {newQuiz.questions.length}</Title>
          </TitleWrapper>
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
          {newQuiz.questions.map((question: QuizQuestion, indexGlobal) => {
            if (question.type === "existing") {
              return (
                <div key={indexGlobal}>
                  <SelectWrapper>
                    <Select
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
                  </SelectWrapper>
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
                    <NewQuestionWrapper>
                      <CustomTextArea
                        placeholder={"Your question"}
                        onChange={(e) => {
                          onChangeTextArea(e.target.value, indexGlobal, true);
                        }}
                        value={newQuiz.questions[indexGlobal].question}
                      />
                      <CustomTextArea
                        onChange={(e) => {
                          onChangeTextArea(e.target.value, indexGlobal);
                        }}
                        placeholder={"Your answer"}
                        value={newQuiz.questions[indexGlobal].answer}
                      />
                    </NewQuestionWrapper>
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
            <Option
              $option={"option1"}
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
            </Option>
            <Option
              $option={"option2"}
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
            </Option>
          </AddQuestionOptionsContainer>
          <div>
            <ProjectPrimaryButton onClick={() => onValidate()}>
              {isEditing ? "Save" : "Add Quiz"}
            </ProjectPrimaryButton>
          </div>
        </>
      )}
    </CustomContainer>
  );
}

const CustomContainer = styled(Container)`
  label {
    color: white !important;
  }
  .ant-row {
    display: unset !important;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    margin-top: 0;
    @media (max-width: 400px) {
      font-size: 16px;
    }
  }
`;

const NewQuestionWrapper = styled.div`
  width: 100%;
  display: flex;
  > :first-child {
    width: 75%;
    margin-right: 10px;
    @media (max-width: 800px) {
      width: 66%;
    }
    @media (max-width: 650px) {
      margin-bottom: 5px;
    }
  }
  > :nth-child(2) {
    width: 25%;
    @media (max-width: 800px) {
      width: 34%;
    }
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;
const CustomTextArea = styled(TextArea)`
  @media (max-width: 650px) {
    width: 100% !important;
  }
`;

const AddQuestionOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  @media (max-width: 460px) {
    flex-direction: column;
  }
`;

const Option = styled.div<{ $option: "option1" | "option2" }>`
  width: 50%;
  height: 32px;
  background-color: ${(props) =>
    props.$option == "option1" ? "white" : "#d73b21"};
  text-align: center;
  color: ${(props) => (props.$option == "option1" ? "#d73b21" : "white")};
  padding-top: 4px;
  cursor: pointer;
  :first-of-type {
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
    @media (max-width: 460px) {
      border-radius: 6px;
      margin-bottom: 6px;
    }
  }
  :last-of-type {
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    @media (max-width: 460px) {
      border-radius: 6px;
    }
  }
  @media (max-width: 460px) {
    width: 100%;
    padding-top: 4px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  margin-top: 10px;

  & > .ant-select {
    flex-grow: 1;
  }
`;
