import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import PoliceStation from '../../components/Police/PoliceStation';
import { gql, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';

const POLICESTATION = gql`
  query {
    policeStations {
      id
      name
      description
      image
      postalCode
    }
  }
`;
const PoliceStations = () => {
  const [policeStations, setPoliceStations] = useState([]);
  const { data, loading, error } = useQuery(POLICESTATION);
  const router = useRouter();
  useEffect(() => {
    if (data) setPoliceStations(data.policeStations);
  }, [data]);

  return (
    <Fragment>
      <Layout>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 8 }}
          className='mb-10 mx-2 gap-5'
        >
          {policeStations.length > 0 &&
            policeStations.map((station) => (
              <Grid item xs={2} sm={4} md={2} key={station.id}>
                <PoliceStation station={station} />
              </Grid>
            ))}
        </Grid>
      </Layout>
    </Fragment>
  );
};

export default PoliceStations;
