import { Table } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../../types/quiz";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import { ProjectPrimaryButton } from "../shared/utilities";

interface StyledTableProps {
  data: Quiz[];
}

export default function StyledTable({ data }: StyledTableProps) {
  const { deleteQuiz } = useContext(DataContext);
  const navigate = useNavigate();

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

  return (
    <CustomTable
      dataSource={data.map((item: Quiz) => ({ ...item, key: item.id }))}
      columns={columns}
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
