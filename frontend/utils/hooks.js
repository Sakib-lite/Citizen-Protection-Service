import {  useQuery} from '@apollo/client';
import { COMPLAINT, COMPLAINT_BY_ID, GET_USER, POLICESTATION } from './schema';



export const useComplaint = () => {
  const { data, loading, error } = useQuery(COMPLAINT);
  return {
    complaints: data?.complaints,
    error,
    loading,
  };
};



export const useComplaintById = (id) => {

  const { data, loading, error } = useQuery(COMPLAINT_BY_ID, {
    variables: {
      complaintId: id,
    },
  });

  return {
    complaint: data?.complaint,
    loading,
    error,
  };
};





export const usePoliceStation = () => {
  const { data, loading, error } = useQuery(POLICESTATION);
  return {
    policeStations: data?.policeStations,
    error,
    loading,
  };
};


export const useGetUser = () => {
  const { data, loading, error } = useQuery(GET_USER);
  return {
    user: data?.user,
    error,
    loading,
  };
};
