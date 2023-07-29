import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "themes";
import { ContentfulProvider } from "api";
import App from "App";

const render = (
  ui: React.ReactElement,
  { route = "/" }: { route?: string | null } = {}
) => {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    route ? (
      <App />
    ) : (
      <ContentfulProvider>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </ContentfulProvider>
    );

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
  };
};

const renderHook = (
  hook: any,
  { route = "/" }: { route?: string | null } = {}
) => {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }: { children: any }) => (
    <ContentfulProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={children} />
          <Route path="/recipe/:id" element={children} />
        </Routes>
      </BrowserRouter>
    </ContentfulProvider>
  );

  return rtlRenderHook(() => hook(), { wrapper: Wrapper });
};

export * from "@testing-library/react";
export { render, renderHook };
