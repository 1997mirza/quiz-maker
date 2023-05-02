import { Button } from "antd";
import { StyledTable } from "../components/home/styledTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/quiz";

export default function Home() {
  const { quizzes, setQuizzes } = useContext(DataContext);
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
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("x", id);
            }}
            //sve disabled a jedno loading
          >
            Delete
          </Button>
          <Button
            color={"#f20"}
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quiz/${id}`);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <StyledTable
        pagination={"x"}
        setPagination={"x"}
        data={quizzes}
        columns={columns}
      />
    </div>
  );
}
