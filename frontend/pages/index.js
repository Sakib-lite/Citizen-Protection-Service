import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Layout from '../components/layout/Layout';
import Map from '../components/Map/Map';
import Container from '@mui/material/Container';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setLoading, unsetLoading, unsetShowModal } from '../components/store/ui-slice';
import { useComplaint } from '../utils/hooks';
import { setComplaint } from '../components/store/complaintSlice';


export default function Home() {
  const [coords, setCoords] = useState({}); // user's current location

  const { complaints, loading:complaintLoading } = useComplaint();
  const dispatch = useDispatch();

  useEffect(() => {
    if (complaints) dispatch(setComplaint(complaints));
  }, [complaints]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
    dispatch(unsetShowModal());
  }, []);

  useEffect(()=>{
    if(complaintLoading)dispatch(setLoading())
    else if(!complaintLoading)dispatch(unsetLoading())
    else dispatch(unsetLoading())
    },[complaintLoading])

  return (
    <Fragment>
      <Layout>
        {/* navbar */}
        <Container>
          {/* map interface */}
          <Map setCoords={setCoords} coords={coords} />
        </Container>{' '}
      </Layout>
    </Fragment>
  );
}
