import React, { Fragment, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import PoliceStation from '../../components/Police/PoliceStation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

const POLICESTATION = gql`
  query ($policeStationId: ID!) {
    policeStation(id: $policeStationId) {
      id
      complaints {
        id
        title
        description
        status
      }
    }
  }
`;

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(POLICESTATION, {
    variables: {
      policeStationId: slug,
    },
  });

  useEffect(() => {
    if (data) setComplaints(data.policeStation.complaints);
  }, [data]);

  if (loading) return <h1>loading....</h1>;
  if (complaints.length === 0)
    return (
    
    <Layout>

    <div class='bg-white'>
        <div class='space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32'>
          <div class='text-center'>
            <div class='text-sm uppercase font-bold tracking-wider mb-1 text-blue-700'>
             No complaints yet
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    </Layout>
    );

  return (
    <Fragment>
      <Layout>
        <div className='flex grid grid-cols-3 gap-4'>
          {complaints.map((complaint) => (
            <PoliceStation
              id={complaint.id}
              key={complaint.id}
              name={complaint.title}
              description={complaint.description}
              status={complaint.status}
            />
          ))}
        </div>
      </Layout>
    </Fragment>
  );
};

export default Complaint;
