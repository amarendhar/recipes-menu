import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { RecipeListItem } from "types";

type RecipeItemProps = {
  recipe: RecipeListItem;
};

export const RecipeItem = ({ recipe }: RecipeItemProps) => {
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
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const RecipeName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;
