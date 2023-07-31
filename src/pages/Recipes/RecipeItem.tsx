import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Rating } from "components";
import { UseRecipesProps } from "./useRecipes";
import { RecipesItemData } from "types";

type RecipeItemProps = {
  recipe: RecipesItemData;
  handleAddRating: UseRecipesProps["handleAddRating"];
};

export const RecipeItem = ({ recipe, handleAddRating }: RecipeItemProps) => {
  const onChangeRating = useCallback(
    (rating: number) => {
      handleAddRating({ recipeId: recipe.id, rating });
    },
    [handleAddRating, recipe.id]
  );

  return (
    <NavLink data-testid="recipe-item" to={`/recipe/${recipe.id}`}>
      <RecipeItemContainer>
        <RecipeImage>
          <img
            data-testid="recipe-image"
            src={recipe.image}
            alt={recipe.title}
          />
        </RecipeImage>
        <RecipeDetails>
          <RecipeName data-testid="recipe-name">{recipe.title}</RecipeName>
          <Rating value={recipe.rating} onChange={onChangeRating} />
        </RecipeDetails>
      </RecipeItemContainer>
    </NavLink>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const RecipeItemContainer = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: ${({ theme }) => theme.shadows[2]};
  animation: ${fadeIn} 0.2s ease-in;
  transition: all 0.2s ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }
`;

const RecipeImage = styled.div`
  position: relative;
  padding-top: 66.66%;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    inset: 0;
    overflow: hidden;
    transition: transform 0.2s
      ${({ theme }) => theme.transitions.easing.easeInOut} 0ms;
    background-color: ${({ theme }) => theme.palette.grey[500]};
  }
`;

const RecipeDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const RecipeName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;
