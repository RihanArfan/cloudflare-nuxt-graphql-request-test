import { gql, request } from 'graphql-request'
import { getFormattedLocale } from '../utils/get-formatted-locale';

export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event);
  const formatedLocale = getFormattedLocale(locale);

  const env = event.context.cloudflare?.env || process.env || {}
  const endpoint = env.PAYLOAD_GRAPHQL_URL as string;

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

  return await request(endpoint, query, { locale: formatedLocale });
});
