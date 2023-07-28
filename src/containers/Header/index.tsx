import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <Content>
        <Title to="/">
          <h2>Recipes Menu</h2>
        </Title>
      </Content>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[2]};
  z-index: 99;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  max-width: 100%;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 100%;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 960px;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 1144px;
  }
`;

const Title = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;
