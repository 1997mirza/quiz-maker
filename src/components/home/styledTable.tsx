import { Table } from "antd";
import styled from "styled-components";

interface StyledTableProps {
  pagination: any;
  setPagination: any;
  data: any;
  columns: any;
}

export function StyledTable({ data, columns }: StyledTableProps) {
  return (
    <CustomTable
      dataSource={data}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            console.log("event", record);
          }, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
    />
  );
}

const CustomTable = styled(Table)`
  max-width: 1180px;
  margin: auto;
`;
