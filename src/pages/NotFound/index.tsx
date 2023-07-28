import styled from "styled-components";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <Container>
    <h2>Page Not Found</h2>
    <Link to="/">Go Back</Link>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.spacing(5)};

  a {
    padding: ${({ theme }) => theme.spacing(5)};
  }
`;
