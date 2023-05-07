import styled from "styled-components";

interface CustomErrorMessageProps {
  title?: string;
  description?: string;
}

export default function CustomErrorMessage({
  title,
  description,
}: CustomErrorMessageProps) {
  return (
    <Wrapper>
      <b>{title}</b>
      <br />
      <br />

      <span>{description}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: auto;
  background-color: #f2e2e2;
  padding: 20px;
  color: red;
  border-radius: 8px;
  span {
    font-weight: 300;
    font-style: italic;
  }
`;
