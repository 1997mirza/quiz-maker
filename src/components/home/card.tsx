import styled from "styled-components";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card as AntCard, Skeleton, Switch } from "antd";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
const { Meta } = AntCard;

interface StyledTableProps {
  title: string;
  id: number;
}

export default function Cards({ title, id }: StyledTableProps) {
  const { deleteQuiz } = useContext(DataContext);
  return (
    <Link to={`/quiz/${id}`}>
      <CustomAntCard
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
