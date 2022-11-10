import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Layout from '../components/layout/Layout';
import Map from '../components/Map/Map';
import Container from '@mui/material/Container';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setComplaint } from '../components/store/complaintSlice';
import { useRouter } from 'next/router';
import { unsetShowModal } from '../components/store/ui-slice';
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

export default function Home() {
  const [coords, setCoords] = useState({}); // user's current location
  const { data } = useQuery(COMPLAINT);
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
    dispatch(unsetShowModal());
    if (!user) router.push('/login');
  }, []);

  useEffect(() => {
    if (data) dispatch(setComplaint(data.complaints));
  }, [data]);

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
