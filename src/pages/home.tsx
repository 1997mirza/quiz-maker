import StyledTable from "../components/home/styledTable";
import { useContext, useState } from "react";
import { DataContext } from "../DataProvider";
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

export default function Home() {
  const { quizzes } = useContext(DataContext);
  const [numDisplayed, setNumDisplayed] = useState(8);

  return (
    <Container>
      <Title>Quizzes</Title>
      {quizzes.length > 0 ? (
        <>
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
          <DesktopContainer>
            <StyledTable data={quizzes} />
          </DesktopContainer>
        </>
      ) : (
        <NoProjectSection>
          Currently, there are no quizzes available 😞 .Would you like to create
          a new one?
          <br />
          <Link to={"/create-new"}>
            <ProjectPrimaryButton>Create new one</ProjectPrimaryButton>
          </Link>
        </NoProjectSection>
      )}
    </Container>
  );
}
const NoProjectSection = styled.div`
  color: #e24e32;
`;
