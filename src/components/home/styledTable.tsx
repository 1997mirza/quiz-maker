import { Table } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Question } from "../../../types/question";

interface StyledTableProps {
  pagination: any;
  setPagination: any;
  data: any;
  columns: any;
}

export function StyledTable({ data, columns }: StyledTableProps) {
  const navigate = useNavigate();
  return (
    <CustomTable
      dataSource={data.map((item: Question) => ({ ...item, key: item.id }))}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            // @ts-ignore
            navigate(`/quiz/${record.id}`);
          }, // click row
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
