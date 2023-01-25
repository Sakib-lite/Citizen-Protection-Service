import { gql} from '@apollo/client';

export const COMPLAINT_UPDATE = gql`
  mutation ($complaintUpdateId: ID!, $status: String!) {
    complaintUpdate(id: $complaintUpdateId, status: $status) {
      userErrors {
        message
      }
      complaint {
        id
        title
        status
        policeStation {
          name
        }
      }
    }
  }
`;

export const COMPLAINT = gql`
  query {
    complaints {
      id
      title
      description
      images
      status
      location {
        coordinates
      }
      policeStation {
        id
      }
    }
  }
`;
export const COMPLAINT_BY_ID = gql`
  query ($complaintId: ID!) {
    complaint(id: $complaintId) {
      id
      title
      description
      images
      status
      createdAt
      policeStation {
        id
        name
        description
        image
      }
      comments {
        id
        comment
        createdAt
        author {
          image
          name
        }
      }
    }
  }
`;

export const POLICESTATION = gql`
  query {
    policeStations {
      id
      name
      image
      description
      location {
        coordinates
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
      name
      number
      image
      complaints {
        id
        images
        title
        status
      }
    }
  }
`;
