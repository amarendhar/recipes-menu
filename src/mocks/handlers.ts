import { rest } from "msw";
import {
  RECIPES_LIMIT,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT_ID,
} from "globalConstants";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

const BASE_URL = `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}`;
const DELAY = 150;

export const handlers = [
  rest.get(`${BASE_URL}/entries`, (req, res, ctx) => {
    return res(ctx.json(mockRecipes), ctx.delay(DELAY));
  }),
  rest.get(
    `${BASE_URL}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries`,
    (req, res, ctx) => {
      const entryId = req.url.searchParams.get("sys.id");
      const skip = Number(req.url.searchParams.get("skip") || 0);
      const limit = Number(req.url.searchParams.get("limit") || RECIPES_LIMIT);

      if (entryId) {
        const entry = mockRecipes.items.find((item) => item.sys.id === entryId);

        return entry
          ? res(
              ctx.json({
                ...mockRecipes,
                items: [entry],
              }),
              ctx.delay(DELAY)
            )
          : res(ctx.status(404), ctx.delay(DELAY));
      }

      return res(
        ctx.json({
          ...mockRecipes,
          items: mockRecipes.items.slice(skip, skip + limit),
        }),
        ctx.delay(DELAY)
      );
    }
  ),
];
