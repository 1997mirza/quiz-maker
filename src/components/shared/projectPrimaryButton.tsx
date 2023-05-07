import styled from "styled-components";
import { Button } from "antd";

interface CustomErrorMessageProps {
  text: string;
  isDisabled?: boolean;
}

export default function ProjectPrimaryButton({
  text,
  isDisabled,
}: CustomErrorMessageProps) {
  return <CustomButton disabled={isDisabled}>{text}</CustomButton>;
}

const CustomButton = styled(Button)`
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
