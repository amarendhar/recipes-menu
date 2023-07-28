import { styled } from "styled-components";

type ErrorProps = {
  "data-testid"?: string;
  size?: number;
  children?: React.ReactNode;
};

export const Error = ({
  size,
  children = "Error",
  ...restProps
}: ErrorProps) => {
  return (
    <Container
      data-testid={restProps["data-testid"] || "error"}
      $size={size || 5}
    >
      {children}
    </Container>
  );
};

const Container = styled.div<{ $size: number }>`
  padding: ${({ theme, $size }) => theme.spacing($size)};
`;
