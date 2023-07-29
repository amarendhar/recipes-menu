import { rest } from "msw";
import {
  CONTENTFUL_BASE_URL,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT_ID,
} from "globalConstants";
import mockRecipes from "../__fixtures__/mockRecipes.json";

const BASE_URL = `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}`;

export const handlers = [
  rest.get(`${BASE_URL}/entries`, (req, res, ctx) => {
    return res(ctx.json(mockRecipes), ctx.delay(150));
  }),
  rest.get(
    `${BASE_URL}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries`,
    (req, res, ctx) => {
      return res(ctx.json(mockRecipes), ctx.delay(150));
    }
  ),
];
