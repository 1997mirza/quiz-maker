import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Button, ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";

import { Question } from "../types/question";
import { Quiz } from "../types/quiz";
import Home from "./pages/home";
import Edit from "./pages/edit";
import CreateNew from "./pages/create-new";
import QuizSlider from "./pages/quiz";
import styled from "styled-components";
import BrainLogo from "./assets/brain-logo.png";
import { DataProvider } from "./DataProvider";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [count, setQount] = useState(1);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "orange",
        },
      }}
    >
      <Layout>
        <div
          style={{
            height: "84px",
            width: "1180px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px",
            color: "white",
          }}
        >
          <img
            src={BrainLogo}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <Button style={{ backgroundColor: "#d73b21", border: "unset" }}>
            Create new
          </Button>
        </div>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create-new" element={<CreateNew />} />
            <Route path="/quiz/:id" element={<QuizSlider />} />
          </Routes>
        </DataProvider>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

const Layout = styled.div`
  background: linear-gradient(
    90deg,
    rgba(6, 6, 7, 1) 0%,
    rgba(43, 43, 48, 1) 100%
  );
  min-height: 100vh;
`;
