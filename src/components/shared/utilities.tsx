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
  @media (max-width: 1220px) {
    width: auto;
    padding: 0 20px;
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
