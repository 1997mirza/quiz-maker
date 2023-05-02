import React, { useState } from "react";
import "./App.css";
import { Button, ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import Edit from "./pages/edit";
import Home from "./pages/home";
import CreateNew from "./pages/create-new";
import QuizSlide from "./pages/quiz";
import { Question } from "../types/question";
import { Quiz } from "../types/quiz";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizes, setQuizes] = useState<Quiz[]>([]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "orange",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/quiz/:id" element={<QuizSlide />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
