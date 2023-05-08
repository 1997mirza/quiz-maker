import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import BrainLogo from "../assets/brain-logo.png";
import { Container, ProjectPrimaryButton } from "./shared/utilities";

export default function TopSection() {
  const router = useLocation();

  const currentRoute = router.pathname;

  return (
    <CustomContainer>
      <CustomLink to={"/"}>
        <QuizLogo src={BrainLogo} alt="quiz-logo" />
        <Title> Pub quiz</Title>
      </CustomLink>
      {currentRoute !== "/create-new" && !currentRoute.includes("edit") && (
        <Link to={"/create-new"}>
          <ProjectPrimaryButton>Create new</ProjectPrimaryButton>
        </Link>
      )}
    </CustomContainer>
  );
}
const CustomContainer = styled(Container)`
  height: 84px;
  display: flex;
  justify-content: space-between;
  color: white;
  padding-bottom: 0 !important;
`;
const QuizLogo = styled.img`
  width: 80px;
  height: 80px;
`;
const Title = styled.h2`
  color: #d73b21;
  @media (max-width: 420px) {
    display: none;
  }
`;

const CustomLink = styled(Link)`
  display: flex;
  text-decoration: unset;
`;
