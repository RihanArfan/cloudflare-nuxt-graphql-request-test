import { gql, GraphQLClient } from 'graphql-request'
import { getFormattedLocale } from '../utils/get-formatted-locale';

export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event);
  const formatedLocale = getFormattedLocale(locale);

  const endpoint = process.env.PAYLOAD_GRAPHQL_URL as string;
  const graphQLClient = new GraphQLClient(endpoint, { fetch });

  const query = gql`
    query ExampleQuery($locale: String!) {
      launchesUpcoming(find: { mission_name: $locale }) {
        id
        details
        launch_date_utc
        mission_name
      }
    }
  `;

  return await graphQLClient.request(query, { locale: formatedLocale });
});
