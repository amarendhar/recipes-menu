import styled from "styled-components";
import MarkdownToJSX from "markdown-to-jsx";

type MarkdownProps = {
  children: string;
};

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <MarkdownToJSX
      data-testid="markdown"
      className="markdown"
      options={{
        overrides: {
          a: {
            component: Link,
            props: {
              className: "markdown-link",
            },
          },
        },
      }}
    >
      {children}
    </MarkdownToJSX>
  );
};

type LinkProps = {
  children: React.ReactNode;
};

const Link = ({ children, ...restProps }: LinkProps) => (
  <LinkEle {...restProps}>{children}</LinkEle>
);

const LinkEle = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.markdown.link.main};

  &:hover {
    color: ${({ theme }) => theme.palette.markdown.link.dark};
  }

  &:active {
    color: ${({ theme }) => theme.palette.markdown.link.light};
  }
`;
