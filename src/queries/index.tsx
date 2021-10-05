
import { gql } from '@apollo/client';

export const COMPANY = gql`
  query GetCompany  {
    company {
      ceo
      coo
      cto
      cto_propulsion
      founded
      founder
      name
      summary
    }
  }
`;


