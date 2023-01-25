import React, { Fragment, useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';
import PoliceStationCard from '../Police/PoliceStationCard';
import moment from 'moment';
import { useComplaintById } from '../../utils/hooks';
import Loading from '../layout/Loading';
import AllComments from '../Comments/AllComments';
import CommentForm from '../Comments/CommentForm';
import { useDispatch } from 'react-redux';
import { setComment } from '../store/commentSlice';

const ComplaintDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  const { complaint, loading, error } = useComplaintById(slug);


  useEffect(() => {
    if (complaint?.comments) dispatch(setComment(complaint.comments));
  }, [complaint]);



  if (loading) return <Loading />;
  if (error) return <p className='text-red-300'></p>;

  const createdAt = moment(complaint.createdAt).format('MMMM Do YYYY');

  const { comments, id } = complaint;

  const {
    name,
    description,
    image,
    id: stationId,
    address,
  } = complaint.policeStation;
  const featuredImage =
    (complaint?.images.length > 0 && complaint?.images[0]) ||
    'https://res.cloudinary.com/dlgajwgag/image/upload/v1673864243/test/pngwing.com_buuhxy.png';
  const bg = complaint.status === 'pending' ? 'bg-red-500' : 'bg-green-500';

  return (
    <Fragment>
      <Layout>
        <Fragment>
          <div className='h-full bg-gray-200 p-8 dark:bg-gray-500 py-6 sm:py-8 lg:py-12'>
            <div className='max-w-screen-lg px-4 md:px-8 mx-auto'>
              <div className='grid md:grid-cols-2 gap-8'>
                <div className='space-y-4'>
                  <div className='bg-gray-100 dark:bg-dark-800 rounded-lg overflow-hidden relative'>
                    <img
                      src={featuredImage}
                      loading='lazy'
                      alt='Photo by Himanshu Dewangan'
                      className='w-full h-full object-cover object-center'
                    />

                    <span
                      className={`${bg} text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    {complaint?.images.length > 0 &&
                      complaint?.images.map((url, index) =>
                        index !== 0 ? (
                          <div className='bg-gray-100 rounded-lg overflow-hidden'>
                            <img
                              src={url}
                              alt='Photo by Himanshu Dewangan'
                              className='w-full h-full object-cover object-center'
                            />
                          </div>
                        ) : null
                      )}
                  </div>
                </div>

                <div className='md:py-8'>
                  <div className='mb-2 md:mb-3'>
                    <span className='inline-block text-gray-500 mb-0.5'>
                      Complaint
                    </span>
                    <h2 className='text-gray-800 dark:text-gray-100 text-2xl lg:text-3xl font-bold'>
                      {complaint.title || 'Complaint Name'}
                    </h2>
                  </div>

                  <div className='flex items-center text-gray-500 dark:text-gray-100  gap-2 mb-6'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>

                    <span className='text-sm'>{createdAt}</span>
                  </div>

                  <div className='flex gap-2.5'>
                    <a
                      href='#'
                      className='inline-block flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
                    >
                      Change to Private
                    </a>
                  </div>

                  <div className='mt-10 md:mt-16 lg:mt-20'>
                    <div className='dark:text-gray-100 text-gray-800 text-lg font-semibold mb-3'>
                      Description
                    </div>

                    <p className='dark:text-gray-100 text-gray-500'>
                      {complaint.description || ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-200 dark:bg-gray-500 '>
              <div className='mx-20 rounded-lg  '>
                {' '}
                <PoliceStationCard
                  name={name}
                  address={address}
                  description={description}
                  image={image}
                  status={complaint.status}
                  stationId={stationId}
                />
              </div>{' '}
            </div>
            <div className='flex-1 bg-white rounded-lg shadow-xl p-8 mt-16'>
              <AllComments />
              <CommentForm id={id} />
            </div>
          </div>{' '}
        </Fragment>
      </Layout>
    </Fragment>
  );
};

export default ComplaintDetails;
