import styled from "styled-components";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card as AntCard, message } from "antd";
import { useState } from "react";
import { QuizApi } from "../../http/quiz/quizApi";
const { Meta } = AntCard;

interface StyledTableProps {
  title: string;
  id: number;
}

export default function Cards({ title, id }: StyledTableProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteQuiz = async (quizId: number) => {
    try {
      setIsDeleting(true);
      await QuizApi.deleteQuiz(quizId);
      message.success("The quiz has been successfully deleted");
      setIsDeleting(false);
    } catch (error: any) {
      message.error(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <Link to={`/quiz/${id}`}>
      <CustomAntCard
        aria-disabled={isDeleting}
        style={{ width: "100%", marginBottom: "16px" }}
        actions={[
          <Link to={`/quiz/${id}/edit`}>
            <EditOutlined style={{ fill: "red" }} key="edit" />
          </Link>,
          <DeleteOutlined
            onClick={(e) => {
              e.preventDefault();
              deleteQuiz(id);
            }}
            key="delete"
          />,
        ]}
      >
        <Meta title={title} description={`id:${id}`} />
      </CustomAntCard>
    </Link>
  );
}

const CustomAntCard = styled(AntCard)`
  svg {
    fill: #e24e32;
  }
  .ant-card-meta-title {
    text-decoration: none;
  }
  ::before .ant-card-meta-description {
    text-decoration: none;
  }
  a {
    text-decoration: none !important;
  }
`;
