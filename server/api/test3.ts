import { gql, GraphQLClient } from 'graphql-request'

export default defineEventHandler(async () => {
  const endpoint = `https://main--spacex-l4uc6p.apollographos.net/graphql`;

  const graphQLClient = new GraphQLClient(endpoint, { fetch });

  const query = gql`
    {
      launchLatest {
        rocket {
          rocket_name
          rocket_type
        }
      }
    }
  `;

  return await graphQLClient.request(query);
});
