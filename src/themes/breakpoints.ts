const breakPointValues = {
  xs: 375,
  sm: 600,
  md: 768,
  lg: 1024,
  xl: 1200,
};

export const breakpoints = {
  ...breakPointValues,
  up: (val: string) => {
    return `@media (min-width: ${
      breakPointValues[val as keyof typeof breakPointValues]
    }px)`;
  },
  down: (val: string) => {
    return `@media (max-width: ${
      breakPointValues[val as keyof typeof breakPointValues]
    }px)`;
  },
};
