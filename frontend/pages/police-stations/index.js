import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import PoliceStation from '../../components/Police/PoliceStation';
import { gql, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const POLICESTATION = gql`
  query {
    policeStations {
      id
      name
      description
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
        <div className='flex grid grid-cols-3 gap-4'>
          {policeStations.map((police) => (
            <Button onClick={()=>router.push(`/police-stations/${police.id}`)}>
              <PoliceStation
                id={police.id}
                key={police.id}
                name={police.name}
                description={police.description}
              />
            </Button>
          ))}{' '}
        </div>
      </Layout>
    </Fragment>
  );
};

export default PoliceStations;
