# Recipes Menu

## Overview

This is a sample web application that uses the [Contentful Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) to fetch and display recipes. It consists of two views: a list-view of all the recipes and a details-view of a recipe. The application is built using React and TypeScript and is responsive to different screen sizes. Additionally, it includes a bonus feature where customers can rate a recipe from 1 to 5.

## Implementation Details

- Front-end: React
- Responsiveness: Yes
- TypeScript Usage: Yes
- Recipe Rating: Yes
- Data Source: [Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/)

## Setup Development

- Clone this repository to your local machine:
- Change into the project directory:

```bash
cd recipes-menu
```

- Create a `.env` file in the project root directly and copy the content from `env.example` or run the below script, it'll generate `.env` from `.env-example`

```bash
./setup-env.sh
```

- Replace `<replace_with_actual_spaceID>` with your **Contentful Space ID** in `.env`.
- Replace `<replace_with_actual_accessToken>` with your **Contentful Access Token** in `.env`.
- `REACT_APP_CONTENTFUL_ENVIRONMENT_ID` is optional it can be included/removed from the `.env` file.
- Make sure you have **Node.js** and **npm** installed on your machine.
- Install the required dependencies:

```bash
npm install
```

- Start the development server.

```bash
npm start
```

- Open your browser and visit http://localhost:3000 to view the application.

## Production

To create a production build of the application:

```bash
npm run build
```

The production build will be created in the build directory.
To serve the production build:

```bash
npm run serve
```

## Testing

To run unit tests use the following command:

```bash
npm run test
```

## Type-check

To analyze TypeScript code for type errors:

```bash
npm run type-check
```

## Functionality

### List View (Recipes-Page)

The list view displays a preview of all recipes, each showing the title, image, and rating. Clicking on a recipe item will navigate to the detailed view. Build with the below components, hooks & utils:

- **Recipes-Component**
  - Renders `title` and `recipes-list` with loading status from the API
  - Load `More-Recipes-Onscroll` from the API by using cursor/skip & limit values, the default values of limit is 24, which can be changed from `globalConstants`, and cursor value will be changed based onscroll.
  - Show `No recipes available at the moment, please try again later`, when there are no recipes available from the API
- **RecipeItem-Component**
  - Each recipe-item in the list displays the recipe-name/title, recipe-image & recipe-rating. Clicking on a recipe-item will take you to the details-page of that recipe-item.
- **useRecipes-hook**
  - Prepares the recipes-list-data from `useFetchRecipes`.
  - Handle adding `rating` of the recipe-items.
  - Return prepared recipes, loading status, error status and handleAddRating callback to handle rating.
- **useFetchRecipes-hook**
  - Fetch recipes-list from the API
  - Load/Fetch more recipes onscroll based on cursor/skip & limit values.
- **prepareRecipes-util**
  - prepares recipes-list with id, title, image and rating to be used in the UI.
- **Responsive design with grid-box**

### Details View (Recipe-Page)

The detailed view displays all the data for a selected recipe, including the title, image, list of tags, description (with Markdown rendered), chef name, and the recipe's rating. Customers can also rate the recipe using the star icons provided. Build with the below components, hooks & utils:

- **Recipe-Component**
  - Renders `title, image, markdown-description, tags, chef & rating` with loading status from the API
  - Show `Recipe not available at the moment, please try again later`, when there is no recipe available from the API
- **useRecipe-hook**
  - Prepares the recipe-data from `useFetchRecipe`.
  - Handle adding `rating` of the recipe.
  - Return prepared recipe, loading status, error status and handleAddRating callback to handle rating.
- **useFetchRecipe-hook**
  - Fetch recipe-data for the given recipeId from the API.
  - The recipeId will be captured from the url `/recipe/:recipeId` and provided from useRecipe-hook
- **prepareRecipe-util**
  - prepares recipe-data with id, title, image, description, rating, tags & chef to be used in the UI.
- **Responsive design**

### Common Components

- **src/components/Markdown**
  - To render markdown-description in the details/recipe-page.
- **src/components/Rating**
  - To rate a recipe on recipes-page or recipe-page.
- **src/components/Button**
  - Basic button component with small & large variants, used in NotFound-page
- **src/components/Markdown**
  - To render error-txt from the API
- **src/components/Loading**
  - To render loading-status from the API

### API-Provider

- **ContentfulContext**
  - Provides `ContentfulProvider` to wrap App.
  - `contentful-client` can be accessed anywhere in the App by using `useContentful-hook` for the APIs.

### Theme

- Used `styled-components` and followed [Material-UI guidelines](https://mui.com/material-ui/customization/default-theme/)
- It basically supports converting this application into dark-mode with less effort.
- This application can also be converted into SASS with less effort with the existing defined `breakpoints, lightPalette, shadows, shape, spacing, transitions & typography`.
- Created `styled.d.ts` file to access intellisense of them when using in the styled-components.
- All global-styles are given at `src/globalStyles.ts`

### npm packages

- [contentful/contentful.js](https://github.com/contentful/contentful.js)
  - Used for Contentful-Delivery-API to take away boilerplate code of using native fetch, but this app can easily be converted into using plain native fetch instead of contentful-npm.
- [contentful/markdown-to-jsx](https://github.com/contentful/markdown-to-jsx)
  - Used from the contentful to render markdown-description with the help of `src/components/Markdown` component.
- [React-Testing-Library](https://testing-library.com/docs/react-testing-library/cheatsheet/) for unit-testing.
  - Covered all the unit-test cases including end-to-end test cases.
  - Created `test-utils` to handle all the test-cases with routing and contextProvider options.
- [msw (mock-service-worker)](https://mswjs.io/docs/getting-started/mocks/rest-api) for mocking APIs.
  - The mock-server, mock-API-handlers, and mock-fixtures are available in `src/mocks` folder

### Screenshots

- [Recipes-Page and Recipe-Page with different screen sizes](https://drive.google.com/drive/folders/18qH3OQVNjWpGaua3LAo1iMzlTrPLIIdw?usp=sharing)

### Notes

- The application is implemented with production readiness in mind but is not deployed.
- Due to time constraints, some shortcuts were taken in error handling and handling unresolved entries from the API.
- `src/globalConstants` is responsible for fetching all the tokens from the `.evn` file to be accessed by contentful-client.
