import { useState, useEffect, MouseEvent, useCallback } from "react";
import styled from "styled-components";

type RatingProps = {
  value: number;
  onChange: (val: number) => void;
};

export const Rating = ({ value, onChange, ...restProps }: RatingProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onChangeHandler = useCallback(
    (value: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setSelectedValue(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <Container data-testid="rating-container" {...restProps}>
      {[...Array(5)].map((_, key) => {
        const value = key + 1;
        const color =
          value <= selectedValue ? "#faaf00" : "rgba(0, 0, 0, 0.26)";

        return (
          <Star
            data-testid={`rating-${value}`}
            key={value}
            onClick={onChangeHandler(value)}
          >
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              style={{
                color,
              }}
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          </Star>
        );
      })}
      <Input
        data-testid="rating"
        name="rating"
        type="radio"
        value={selectedValue}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;

const Star = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  > svg {
    flex-shrink: 0;
    fill: currentColor;
    transition: transform 150ms
      ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  overflow: hidden;
`;
