import { gql} from '@apollo/client';

export const COMPLAINT_UPDATE = gql`
mutation($complaintUpdateId: ID!, $input: ComplaintUpdateInput!){
  complaintUpdate(id: $complaintUpdateId, input: $input) {
    complaint {
      id
      title
      public
      status
    }
    userErrors {
      message
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
      public
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
        reported
        author {
          image
          name
          id
        }
      }
      author {
        id
      }
    }
  }
`;

export const COMPLAINT_COMMENTS=gql`
query ($complaintId: ID!) {
  complaint(id: $complaintId) {
    comments {
      id
      comment
      createdAt
      author {
        image
        id
        name
      }
    }
  }
}

`

export const COMPLAINT_BY_STATUS=gql`
query($status: String!){
  complaintsByStatus(status: $status) {
    id
  }
}
`

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
      role
      complaints {
        id
        images
        title
        status
      }
    }
  }
`;

export const TOTAL_USERS=gql`
query {
  users {
    id 
  }
}

`
export const TOTAL_COMMENTS=gql`
query{
  comments {
    id
  }
}
`

export const POLICESTATION_NAME=gql`
query {
  policeStations {
    name
    complaints {
      id
    }
  }
}

`

export const COMPLAINT_FILTER=  gql`
query($type: String!){
  complaintFilter(type: $type) {
    count
    name
  }
}
`

export const USER_TABLE=gql`
query {
  users {
    id 
    name
    banned
    role
    comments {
      reported
    }
    complaints {
      id
    }
  }
}

`



export const USER_UPDATE=gql`
mutation($id: ID!, $input: UserInput!){
  userUpdate(id: $id, input: $input) {
    userErrors {
      message
    }
    user {
      id
      banned
    }
  }
}
`


export const COMMENT_DELETE=gql`
mutation($id: ID!){
  commentDelete(id: $id) {
    userErrors {
      message
    }
  }
}`

export const COMMENT_UPDATE=gql`
mutation($commentUpdateId: ID!, $input: CommentUpdate!){
  commentUpdate(id: $commentUpdateId, input: $input) {
    userErrors {
      message
    }
  }
}`