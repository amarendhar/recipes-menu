import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ContentfulProvider } from "api";
import { Layout } from "containers";
import { Recipes, Recipe, NotFound } from "pages";

const App = () => {
  return (
    <ContentfulProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Recipes />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContentfulProvider>
  );
};

export default App;
