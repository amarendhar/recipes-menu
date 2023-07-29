import styled from "styled-components";
import { Error, Loading, Markdown } from "components";
import { useRecipe } from "./useRecipe";

export const Recipe = () => {
  const { recipe, error, loading } = useRecipe();

  if (loading) {
    return <Loading data-testid="recipes-loading" />;
  }

  if (error) {
    return <Error data-testid="recipes-error">{error}</Error>;
  }

  return (
    <RecipeContainer>
      {recipe ? (
        <RecipeContent>
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
            {recipe.tags.length > 0 && (
              <TagsContainer>
                <Label>Tags:</Label>
                <Tags>
                  {recipe.tags.map((tag) => (
                    <div key={tag}>{tag}</div>
                  ))}
                </Tags>
              </TagsContainer>
            )}
            {recipe.chef && (
              <Chef>
                <Label>Chef:</Label>
                <span>{recipe.chef}</span>
              </Chef>
            )}
          </Details>
        </RecipeContent>
      ) : (
        <NoResults data-testid="recipes-not-found">
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

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(7)};
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
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(7)};
`;

const NoResults = styled.h1`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
