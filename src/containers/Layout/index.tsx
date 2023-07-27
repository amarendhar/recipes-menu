import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "GlobalStyles";
import { defaultTheme } from "themes";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
