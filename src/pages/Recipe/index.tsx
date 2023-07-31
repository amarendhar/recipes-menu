import styled, { css } from "styled-components";
import { Error, Rating, Loading, Markdown } from "components";
import { useRecipe } from "./useRecipe";

export const Recipe = () => {
  const { recipe, error, loading, handleAddRating } = useRecipe();

  if (loading) {
    return <Loading data-testid="recipe-loading" />;
  }

  if (error) {
    return <Error data-testid="recipe-error">{error}</Error>;
  }

  return (
    <RecipeContainer data-testid="recipe-container">
      {recipe ? (
        <RecipeContent data-testid="recipe-content">
          <RecipeImage>
            <img
              data-testid="recipe-image"
              src={recipe.image}
              alt={recipe.title}
            />
          </RecipeImage>
          <Details>
            <Title data-testid="recipe-title">{recipe.title}</Title>
            <Description data-testid="recipe-description">
              <Markdown>{recipe.description}</Markdown>
            </Description>
            <RatingContainer>
              <Label>Tags:</Label>
              <Rating value={recipe.rating} onChange={handleAddRating} />
            </RatingContainer>
            {recipe.tags.length > 0 && (
              <TagsContainer data-testid="recipe-tags-container">
                <Label>Tags:</Label>
                <Tags data-testid="recipe-tags">
                  {recipe.tags.map((tag) => (
                    <div data-testid="recipe-tag" key={tag}>
                      {tag}
                    </div>
                  ))}
                </Tags>
              </TagsContainer>
            )}
            {recipe.chef && (
              <Chef data-testid="recipe-chef">
                <Label>Chef:</Label>
                <span>{recipe.chef}</span>
              </Chef>
            )}
          </Details>
        </RecipeContent>
      ) : (
        <NoResults data-testid="recipe-not-found">
          Recipe not available at the moment, please try again later
        </NoResults>
      )}
    </RecipeContainer>
  );
};

const RecipeContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: 0 ${({ theme }) => theme.spacing(4)};

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

const RecipeContent = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const RecipeImage = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.shape.borderRadius}
    ${({ theme }) => theme.shape.borderRadius} 0 0;
  // ToDo: Better provide hard-coded values, instead of relying on breakpoints & aspect-ratio
  height: ${({ theme }) => (theme.breakpoints.xxs * 2) / 3}px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    // ToDo: Better provide hard-coded values, instead of relying on breakpoints & aspect-ratio
    height: ${({ theme }) => (theme.breakpoints.xs * 2) / 3}px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    // ToDo: Better provide hard-coded values, instead of relying on breakpoints & aspect-ratio
    height: ${({ theme }) => (theme.breakpoints.sm * 2) / 3}px;
  }

  img {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    object-fit: cover;
    object-position: center;
    transform: translate(-50%, -50%);
  }
`;

const Details = styled.div`
  padding: ${({ theme }) => theme.spacing(7)};
`;

const Title = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(5)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;

const Description = styled.div`
  padding-top: ${({ theme }) => theme.spacing(7)};
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const LabelContainer = css`
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(7)};
`;

const RatingContainer = styled.div`
  ${LabelContainer};
`;

const TagsContainer = styled.div`
  ${LabelContainer};
`;

const Tags = styled.div`
  display: flex;
  grid-gap: ${({ theme }) => theme.spacing(4)};

  > div {
    padding: ${({ theme }) => theme.spacing(1.5)};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    text-transform: uppercase;
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

const Chef = styled.div`
  ${LabelContainer};
`;

const NoResults = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
