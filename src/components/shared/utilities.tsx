import styled from "styled-components";
import { Button } from "antd";

export const DesktopContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
export const MobileContainer = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
export const Container = styled.div`
  width: 1180px;
  margin: auto;
  padding-bottom: 20px;
  @media (max-width: 1220px) {
    width: auto;
    padding: 0 20px 20px;
  }
  @media (max-width: 360px) {
    padding: 0 10px 10px;
  }
`;

export const ProjectPrimaryButton = styled(Button)`
  background-color: #d73b21;
  border: unset;
  margin-top: 10px;
  color: white;
  margin-left: 1px;
  &:hover {
    background-color: #e24e32;
    color: white !important;
  }
`;
export const Title = styled.h2`
  margin-top: 0;
  color: white;
`;
