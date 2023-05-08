import StyledTable from "../components/home/styledTable";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../../types/quiz";
import styled from "styled-components";
import {
  Container,
  DesktopContainer,
  MobileContainer,
  Title,
  ProjectPrimaryButton,
} from "../components/shared/utilities";
import Card from "../components/home/card";

import { Spin } from "antd";
import { QuizApi } from "../http/quiz/quizApi";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await QuizApi.getQuizzes();
      setQuizzes(res.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Simulating pagination.
  const [numDisplayed, setNumDisplayed] = useState(8);

  if (isLoading || !!error) {
    return (
      <Container>
        {isLoading ? (
          <Spin spinning={true} />
        ) : (
          <h3 style={{ color: "red" }}>{error}</h3>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Title>Quizzes</Title>
      {quizzes.length > 0 ? (
        <>
          {isLoading ? (
            <Spin spinning={true} />
          ) : (
            <MobileContainer>
              {quizzes.slice(0, numDisplayed).map((quiz: Quiz) => {
                return <Card key={quiz.id} id={quiz.id} title={quiz.name} />;
              })}
              {quizzes.length > numDisplayed && (
                <div style={{ textAlign: "center" }}>
                  <ProjectPrimaryButton
                    onClick={() => {
                      setNumDisplayed((prevState) => prevState + 8);
                    }}
                  >
                    Load more
                  </ProjectPrimaryButton>
                </div>
              )}
            </MobileContainer>
          )}
          <DesktopContainer>
            <StyledTable loading={isLoading} data={quizzes} />
          </DesktopContainer>
        </>
      ) : (
        <NoProjectSection>
          Currently, there are no quizzes available 😞 .Would you like to create
          a new one?
          <br />
          <Link to={"/create-new"}>
            <ProjectPrimaryButton
              style={{ display: "block", marginTop: "10px" }}
            >
              Create new one
            </ProjectPrimaryButton>
          </Link>
        </NoProjectSection>
      )}
    </Container>
  );
}
const NoProjectSection = styled.div`
  color: #e24e32;
`;
