import { styled } from "styled-components";

type LoadingProps = {
  "data-testid"?: string;
  size?: number;
};

export const Loading = ({ size, ...restProps }: LoadingProps) => {
  return (
    <Container
      data-testid={restProps["data-testid"] || "loading"}
      $size={size || 5}
    >
      Loading...
    </Container>
  );
};

const Container = styled.div<{ $size: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, $size }) => theme.spacing($size)};
`;
