import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "components";

export const NotFound = () => (
  <Container>
    <h2>Page Not Found</h2>
    <Link to="/">
      <Button>Back to Homepage</Button>
    </Link>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(5)};
`;
