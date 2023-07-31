import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: any;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  variant = "md",
  children,
  icon,
  iconPosition = "start",
  disabled = false,
  className,
  ...restProps
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={className}
      $variant={variant}
      $disabled={disabled}
      {...restProps}
    >
      {iconPosition === "start" && <>{icon}</>}
      <span>{children}</span>
      {iconPosition === "end" && <>{icon}</>}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ $variant: string; $disabled: boolean }>`
  border: 0;
  margin: 0;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: ${({ theme }) => theme.spacing(5)};
  padding: ${({ $variant }) => ($variant === "sm" ? "4px 10px" : "8px 22px")};
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[2]};
  font-size: ${({ $variant }) => ($variant === "sm" ? "14px" : "16px")};
  transition: background-color 0.2s
    ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ $disabled, theme }) =>
    $disabled
      ? `
          box-shadow: ${theme.shadows[1]};
          pointer-events: none;
        `
      : ``}
`;
