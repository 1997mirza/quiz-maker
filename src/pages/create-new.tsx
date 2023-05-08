// The component is used for editing the quiz as well.

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Button, Input, message, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseCircleOutlined } from "@ant-design/icons";
import BrainLogo from "../assets/brain-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Title,
  ProjectPrimaryButton,
} from "../components/shared/utilities";
import { QuizApi } from "../http/quiz/quizApi";
import { QuestionApi } from "../http/question/questionApi";
import { Quiz } from "../../types/quiz";
import { Question } from "../../types/question";

interface QuestionWithType extends Question {
  type: "new" | "existing";
}
interface QuizWithTypedQuestion extends Quiz {
  questions: QuestionWithType[];
}

export default function CreateNew() {
  const [isQuizAdded, setIsQuizAdded] = useState(false);
  const [questions, setQuestions] = useState<Question[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  // for my custom validation
  const [errors, setErrors] = useState<boolean[]>([]);
  const [hasName, setHasName] = useState(true);

  const [newQuiz, setNewQuiz] = useState<QuizWithTypedQuestion>({
    id: 0,
    name: "",
    questions: [],
  });
  const [quizFound, setQuizFound] = useState(false);

  const navigate = useNavigate();
  const router = useLocation();
  const params = useParams();

  const currentRoute = router.pathname;
  const isEditing = currentRoute.includes("edit");

  const onChange = (value: number, index: number) => {
    //If the question already exists in the quiz, display a warning.
    const alreadySelected = newQuiz.questions.some(
      (question) => question.id === value
    );
    if (alreadySelected)
      message.warning("The selected question is already in the quiz.");
    // Find the question, then update the quiz with the question values.
    const newQuestions = newQuiz.questions;
    const questionToUpdate = questions?.find((q) => q.id === value);
    if (questionToUpdate) {
      newQuestions[index] = {
        ...newQuestions[index],
        question: questionToUpdate.question,
        answer: questionToUpdate.answer,
        id: value,
      };
    }
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: newQuestions,
    }));
  };

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const res = await QuestionApi.getQuestions();
      setQuestions(res.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const getQuizById = async () => {
    try {
      setIsLoading(true);
      const res = await QuizApi.getQuiz(parseInt(params?.id as string));
      setQuizFound(true);
      //Set the type of the question to 'new' in order to be able to update it.
      setNewQuiz({
        name: res.data.name,
        id: res.data.id,
        questions: res.data.questions.map((question: Question) => {
          return {
            id: question.id,
            question: question.question,
            answer: question.answer,
            type: "new",
          };
        }),
      });
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
      setQuizFound(false);
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
  };

  useEffect(() => {
    if (isEditing) {
      getQuizById();
    }
    getQuestions();
  }, []);

  const addQuiz = async () => {
    //The same function is used for both adding and editing the quiz.
    // In case of adding a new quiz, the attribute value is set to zero.
    try {
      setIsLoading(true);
      // remove type attribute from question
      const quizToAdd: Quiz = {
        id: newQuiz.id,
        name: newQuiz.name,
        questions: newQuiz.questions.map((q) => ({
          id: q.id,
          question: q.question,
          answer: q.answer,
        })),
      };
      if (isEditing) {
        await QuizApi.editQuiz(quizToAdd, parseInt(params?.id as string));
      } else {
        await QuizApi.addQuiz(quizToAdd);
      }
      message.success(`Quiz successfully ${isEditing ? "edited" : "added"}.`);
      setIsQuizAdded(true);
      setIsLoading(false);
    } catch (error: any) {
      message.error(
        "An error occurred while adding the quiz. Please try again!"
      );
      setIsLoading(false);
    }
  };
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
    //Because of the specificity of the form, the useForm hook was not used.
    //custom validation

    if (newQuiz.questions.length === 0) {
      message.error("The quiz must contain at least one question.");
      return;
    }

    setErrors([]);

    setHasName(!!newQuiz.name);
    if (!newQuiz.name) return;

    const errorArray: boolean[] = [];

    setErrors(errorArray);

    if (errorArray.some((bool) => bool)) {
      return;
    } else {
      // addQuiz(newQuiz, parseInt(params?.id as string));
      addQuiz();
      setIsQuizAdded(true);
    }
  };

  if (isLoading || !quizFound) {
    return (
      <CustomContainer style={{ textAlign: "center" }}>
        {isLoading ? (
          <Spin spinning={true} />
        ) : (
          <h3 style={{ color: "white" }}>
            {error ??
              "The quiz was not found. You will be redirected to the homepage."}
          </h3>
        )}
      </CustomContainer>
    );
  }

  if (!questions) return null;

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
          {newQuiz.questions.map((question: QuestionWithType, indexGlobal) => {
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
                      options={questions?.map((question) => ({
                        value: question.id,
                        label: question.question,
                      }))}
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
                    {
                      type: "new",
                      id: 0,
                      question: "",
                      answer: "",
                    },
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
                    { type: "existing", id: 0, question: "", answer: "" },
                  ],
                }));
              }}
            >
              Choose existing question
            </Option>
          </AddQuestionOptionsContainer>
          <div>
            <ProjectPrimaryButton
              disabled={isLoading}
              loading={isLoading}
              onClick={() => onValidate()}
            >
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
    props.$option === "option1" ? "white" : "#d73b21"};
  text-align: center;
  color: ${(props) => (props.$option === "option1" ? "#d73b21" : "white")};
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
