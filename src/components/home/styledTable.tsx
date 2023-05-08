import { message, Table } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../../types/quiz";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProjectPrimaryButton } from "../shared/utilities";
import { QuizApi } from "../../http/quiz/quizApi";
import { useState } from "react";

interface StyledTableProps {
  data: Quiz[];
  loading: boolean;
}

export default function StyledTable({ data, loading }: StyledTableProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

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
          <ProjectPrimaryButton
            disabled={isDeleting}
            type="primary"
            icon={<DeleteOutlined />}
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
              deleteQuiz(id);
            }}
          >
            Delete
          </ProjectPrimaryButton>
          <ProjectPrimaryButton
            disabled={isDeleting}
            loading={isDeleting}
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quiz/${id}/edit`);
            }}
          >
            Edit
          </ProjectPrimaryButton>
        </>
      ),
    },
  ];

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
    <CustomTable
      dataSource={data.map((item: Quiz) => ({ ...item, key: item.id }))}
      columns={columns}
      loading={loading}
      onRow={(record: any) => {
        return {
          onClick: () => {
            navigate(`/quiz/${record.id}`);
          },
        };
      }}
    />
  );
}

const CustomTable = styled(Table)`
  max-width: 1180px;
  margin: auto;
  .ant-table-row {
    cursor: pointer;
  }
  .ant-spin-container {
    background-color: white;
    border-radius: 8px;
  }
  .ant-pagination {
    padding-bottom: 16px;
  }
  @media (max-width: 1220px) {
    width: auto;
  }
`;
