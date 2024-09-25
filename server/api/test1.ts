import { gql, request } from 'graphql-request'

export default defineEventHandler(async () => {
  const endpoint = `https://main--spacex-l4uc6p.apollographos.net/graphql`;

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

  return await request(endpoint, query);
});
