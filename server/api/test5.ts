import { gql, GraphQLClient } from 'graphql-request'
import { getFormattedLocale } from '../utils/get-formatted-locale';

export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event);
  const formatedLocale = getFormattedLocale(locale);

  const endpoint = process.env.PAYLOAD_GRAPHQL_URL as string;
  const graphQLClient = new GraphQLClient(endpoint, { fetch });

  const query = gql`
    query ExampleQuery($idk: String!) {
      launchLatest {
        rocket {
          rocket_name
          rocket_type
        }
      }
    }
  `;

  return await graphQLClient.request(query, { locale: formatedLocale });
});
