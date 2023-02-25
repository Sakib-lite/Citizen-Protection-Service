import {  useQuery} from '@apollo/client';
import { COMPLAINT, COMPLAINT_BY_ID, GET_USER, POLICESTATION,COMPLAINT_BY_STATUS, TOTAL_USERS, TOTAL_COMMENTS, POLICESTATION_NAME, COMPLAINT_FILTER, USER_TABLE, COMPLAINT_COMMENTS } from './schema';



export const useComplaint = () => {
  const { data, loading, error } = useQuery(COMPLAINT);
  console.log(data);
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
export const useComplaintComments = (id) => {

  const { data, loading, error } = useQuery(COMPLAINT_COMMENTS, {
    variables: {
      complaintId: id,
    },
  });

  return {
    comments: data?.complaint?.comments,
    loading,
    error,
  };
};

export const useComplaintByStatus = (statusString) => {

  const { data, loading, error } = useQuery(COMPLAINT_BY_STATUS, {
    variables: {
      status:statusString
    },
  });
  return {
    complaints: data?.complaintsByStatus.length,
    loading,
    error,
  };
};

export const useComplaintByFilter = (statusString) => {

  const { data, loading, error } = useQuery(COMPLAINT_FILTER, {
    variables: {
      type:statusString
    },
  });
  return {
    complaints: data?.complaintFilter,
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

export const useTotalUsers = () => {
  const { data, loading, error } = useQuery(TOTAL_USERS);
  return {
    users: data?.users,
    error,
    loading,
  };
};
export const useTotalComments = () => {
  const { data, loading, error } = useQuery(TOTAL_COMMENTS);
  return {
    comments: data?.comments,
    error,
    loading,
  };
};


export const usePoliceStationName = () => {
  const { data, loading, error } = useQuery(POLICESTATION_NAME);
  return {
    policeStations: data?.policeStations,
    error,
    loading,
  };
};

export const useUserTable = () => {
  const { data, loading, error } = useQuery(USER_TABLE);

  return {
    users: data?.users,
    error,
    loading,
  };
};
