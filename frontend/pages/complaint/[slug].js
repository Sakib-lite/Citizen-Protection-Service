import React, { Fragment, useEffect } from 'react';
import { gql, useQuery ,useMutation} from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '@mui/material/Button';

const COMPLAINT = gql`
  query ($complaintId: ID!) {
    complaint(id: $complaintId) {
      id
      title
      description
      status
      policeStation {
        id
        name
        description
      }
    }
  }
`;

const COMPLAINT_UPDATE=gql`

mutation($complaintUpdateId: ID!, $status: String!) {
  complaintUpdate(id: $complaintUpdateId, status: $status) {
    userErrors {
      message
    }
    complaint {
      id
      title
      status
      policeStation {
        name
      }
    }
  }
}

`



const GetComplaint = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(COMPLAINT, {
    variables: {
      complaintId: slug,
    },
  });

const [update]=useMutation(COMPLAINT_UPDATE)

 
  const solveHandler=()=>{

update({
  variables:{
    status:"solved",
    complaintUpdateId:slug
  }
})

router.push(router.asPath)
  }


  if (error) return <p className='text-red-300'>Error</p>;
  if (loading) return <p className='text-red-300'>loading....</p>;

  return (
    <Fragment>
  
  <Layout>
      <section>
        <div className='dark:bg-violet-400 flex'>
          <div className='container flex flex-col items-center px-4 py-5  mx-auto text-center lg:pb-56 md:py-10 md:px-10 lg:px-32 dark:text-gray-900'>
            <h1 className='text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900'>
              {data.complaint.title}
            </h1>
            <p className='mt-6  text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900'>
              Description:{data.complaint.description}
            </p>
            <p className='mt-6  text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900'>
              Status:{data.complaint.status}
            </p>
            {data.complaint.policeStation && (
              <Fragment>
                {' '}
                <p className='mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900'>
                  Police Station:{data.complaint.policeStation.name}
                </p>
                <p className='mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900'>
                  Address:{data.complaint.policeStation.description}
                </p>
              </Fragment>
            )}
          
          </div>
        
        <div className="w-48"><Button className='mx-auto' onClick={solveHandler}>Mark as Solved</Button></div>
        </div>
      </section></Layout>
    </Fragment>
  );
};

export default GetComplaint;
