import { createClient, CreateClientParams } from "contentful";
import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT_ID,
} from "globalConstants";

const clientParams: CreateClientParams = {
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
};

if (CONTENTFUL_ENVIRONMENT_ID) {
  clientParams.environment = CONTENTFUL_ENVIRONMENT_ID;
}

export const client = createClient(clientParams);
