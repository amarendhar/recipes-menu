import { useRef } from "react";
import styled from "styled-components";
import { Error, Loading } from "components";
import { useRecipes } from "./useRecipes";
import { RecipeItem } from "./RecipeItem";
import { useOnscroll } from "hooks";

export const Recipes = () => {
  const { recipes, error, loading, loadMore, handleAddRating } = useRecipes();
  const recipesListRef = useRef<HTMLDivElement | null>(null);

  useOnscroll(() => {
    if (!recipesListRef.current) {
      return;
    }

    if (
      recipesListRef.current.scrollHeight - recipesListRef.current.scrollTop ===
      recipesListRef.current.clientHeight
    ) {
      loadMore();
    }
  });

  if (loading) {
    return <Loading data-testid="recipes-loading" />;
  }

  if (error) {
    return <Error data-testid="recipes-error">{error}</Error>;
  }

  return (
    <RecipesContainer data-testid="recipes-container">
      <Title data-testid="recipes-title">Select Your Recipes</Title>
      {recipes.length > 0 ? (
        <RecipesList data-testid="recipes-list" ref={recipesListRef}>
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} handleAddRating={handleAddRating} />
          ))}
        </RecipesList>
      ) : (
        <NoResults data-testid="recipes-not-found">
          No recipes available at the moment, please try again later
        </NoResults>
      )}
    </RecipesContainer>
  );
};

const RecipesContainer = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};

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

const Title = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(5)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;

const RecipesList = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  padding: ${({ theme }) => theme.spacing(4)} 0;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const NoResults = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
