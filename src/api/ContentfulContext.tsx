import React, { useContext, createContext } from "react";
import {
  createClient,
  CreateClientParams,
  ContentfulClientApi,
} from "contentful";
import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT_ID,
} from "globalConstants";

type ContentfulContextValue = ContentfulClientApi<undefined>;

const ContentfulContext = createContext<ContentfulContextValue | null>(null);

const clientParams: CreateClientParams = {
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
};

if (CONTENTFUL_ENVIRONMENT_ID) {
  clientParams.environment = CONTENTFUL_ENVIRONMENT_ID;
}

export const contentfulClient = createClient(clientParams);

type ContentfulProviderProps = {
  children: React.ReactNode;
};

export const ContentfulProvider = ({ children }: ContentfulProviderProps) => {
  return (
    <ContentfulContext.Provider value={contentfulClient}>
      {children}
    </ContentfulContext.Provider>
  );
};

export const useContentful = () => {
  const context = useContext(ContentfulContext);

  if (!context) {
    throw new Error("useContentful must be used within a ContentfulProvider");
  }

  return context;
};
