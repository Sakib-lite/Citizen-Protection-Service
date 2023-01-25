import React, { Fragment, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import PoliceStation from '../../components/Police/PoliceStation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/layout/Loading';
import { setLoading, unsetLoading } from '../../components/store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import AllCards from '../../components/Card/AllCards';
import PoliceStationProfile from '../../components/Police/Profile/PoliceStationProfile';


const POLICESTATION = gql`
  query ($policeStationId: ID!) {
    policeStation(id: $policeStationId) {
      id
      name
      image
      description
      street
      postalCode
      address
      number
      complaints {
        id
        title
        description
        status
        images
      }
    }
  }
`;

const PoliceStationPage = () => {
  const dispatch = useDispatch();
  const [complaints, setComplaints] = useState([]);
  const [policeStation, setPoliceStation] = useState();
  const router = useRouter();
  const { slug } = router.query;



const complaintss=useSelector(state=>state.complaint.complaints).filter((comp)=>comp.policeStation.id===slug)


  const { data, loading, error } = useQuery(POLICESTATION, {
    variables: {
      policeStationId: slug,
    },
  });

  useEffect(() => {
    if (data) {
      setComplaints(data.policeStation.complaints);
      setPoliceStation(data.policeStation);
    }
  }, [data, policeStation]);

  if (loading) {
    dispatch(setLoading());
  } else dispatch(unsetLoading());
 
 
 if (!policeStation) return <Loading/>




  return (
    <Fragment>
      <Layout>
        <PoliceStationProfile policeStation={policeStation} />
        <AllCards complaints={complaintss} />
      </Layout>
    </Fragment>
  );
};

export default PoliceStationPage;
