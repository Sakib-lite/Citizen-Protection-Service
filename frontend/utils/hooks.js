import { gql, useQuery } from '@apollo/client';

const COMPLAINT = gql`
  query {
    complaints {
      id
      title
      location {
        coordinates
      }
    }
  }
`;

export const useComplaint = () => {
  const { data ,loading,error} = useQuery(COMPLAINT);
return {
    complaints:data.complaints
,error,loading
}
};


const POLICESTATION=gql`
query {
  policeStations {
    id
    name
    description
  }
}

`
export const usePoliceStation=()=>{

 const{data,loading,error} =useQuery(POLICESTATION)
 console.log('data', data)

 return {
  policeStations:[],
  error,
  loading
 }
}



