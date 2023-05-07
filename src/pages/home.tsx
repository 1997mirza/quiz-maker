import { Button } from "antd";
import { StyledTable } from "../components/home/styledTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider";
import { Link, useNavigate } from "react-router-dom";
import { Quiz } from "../../types/quiz";
import styled from "styled-components";
import ProjectPrimaryButton from "../components/shared/projectPrimaryButton";
import {
  DesktopContainer,
  MobileContainer,
} from "../components/shared/utilities";

export default function Home() {
  const { quizzes, setQuizzes, deleteQuiz } = useContext(DataContext);
  const navigate = useNavigate();
  const { existingQuestions } = useContext(DataContext);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      render: ({ id }: Quiz) => (
        <>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
              deleteQuiz(id);
            }}
            //sve disabled a jedno loading
          >
            Delete
          </Button>
          <Button
            // color={"#f20"}
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quiz/${id}/edit`);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  console.log("quizess", !!quizzes);

  return (
    <Container>
      <h2 style={{ color: "white", marginTop: "0" }}>Quizzes</h2>
      {quizzes.length > 0 ? (
        <>
          <MobileContainer>
            <h1>dobar dan</h1>
          </MobileContainer>
          <DesktopContainer>
            <StyledTable
              pagination={"x"}
              setPagination={"x"}
              data={quizzes}
              columns={columns}
            />
          </DesktopContainer>
        </>
      ) : (
        <NoProjectSection>
          Currently, there are no quizzes available 😞 .Would you like to create
          a new one?
          <Link to={"/create-new"}>
            <ProjectPrimaryButton text={"Create new one"} />
          </Link>
        </NoProjectSection>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 1180px;
  margin: auto;
  @media (max-width: 1220px) {
    width: auto;
    padding: 0 20px;
  }
`;
const NoProjectSection = styled.div`
  color: #e24e32;
  button {
    margin-left: 10px;
  }
`;
