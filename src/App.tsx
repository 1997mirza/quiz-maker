import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreateNew from "./pages/create-new";
import QuizSlider from "./pages/quiz";
import styled from "styled-components";
import TopSection from "./components/topSection";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e24e32",
        },
      }}
    >
      <Layout>
        <TopSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id/edit" element={<CreateNew />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="/quiz/:id" element={<QuizSlider />} />
        </Routes>
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
