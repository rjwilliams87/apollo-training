import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { typePolicies } from './schema';

const SERVER_URI = 'http://localhost:4000/graphql';

export const createHttpLink = (uri = SERVER_URI) => {
  return new HttpLink({ uri });
};

export const createCache = (typePolicies = {}) => {
  return new InMemoryCache({ typePolicies });
};

export const createClient = () => {
  const link = createHttpLink();
  const cache = createCache(typePolicies);

  return new ApolloClient({
    link,
    cache,
  });
};
