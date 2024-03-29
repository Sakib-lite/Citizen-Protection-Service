import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';
import PoliceStationCard from '../Police/PoliceStationCard';
import moment from 'moment';
import { useComplaintById } from '../../utils/hooks';
import Loading from '../layout/Loading';
import AllComments from '../Comments/AllComments';
import CommentForm from '../Comments/CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { setComment } from '../store/commentSlice';
import ChangleComplaintType from './ChangeComplaintType';
import Image from 'next/image';


const ComplaintDetails = () => {
  const user=useSelector(state=>state.auth.user)
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { complaint, loading, error } = useComplaintById(slug);

  
  useEffect(() => {
    if (complaint?.comments) dispatch(setComment(complaint.comments));
  }, [complaint,dispatch]);



  if (loading) return <Loading />;
  if (error) return <p className='text-red-300'></p>;


  const createdAt = moment(complaint.createdAt).format('MMMM Do YYYY');

  const { comments, id,public:type,status,author } = complaint;

 

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
                    <Image
                      src={featuredImage}
                      loading='lazy'
                      alt='Photo by Himanshu Dewangan'
                      className='w-full h-full object-cover object-center'
                      height='300'
                      width='600'
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
                            <Image
                              src={url}
                              alt='Photo by Himanshu Dewangan'
                              className='w-full h-full object-cover object-center'
                            height='200'
                            width='300'
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

                  <div className='flex items-center text-gray-500 dark:text-gray-100  gap-2 mb-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>

                    <span className='text-sm'>{createdAt}</span>
                  </div>
                  <div className='flex items-center text-gray-500 dark:text-gray-100  gap-2 '>Type: <span className='text-sm'>{type?"Public":'Private'}</span></div>
           {   type &&   <div className='flex items-center text-gray-500 dark:text-gray-100  gap-2 '>Author: <span className='text-sm'>{author?.name}</span></div>
                 }
    {  (author?.id===user?.id || user?.role==='admin')&& type &&   <div className='flex items-center text-gray-500 dark:text-gray-100  gap-2 mb-6'>Mobile Number: <span className='text-sm'>+880{author?.number}</span></div>
                 }
                 
                  <div className='flex gap-2.5'>
               {status==='pending' && (author?.id===user?.id || user?.role==='admin')&&      <ChangleComplaintType id={slug} type={type}/> }
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
              <div className='mx-auto md:w-3/4 rounded-lg  '>
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
            <div className='flex-1 bg-white rounded-lg shadow-xl md:p-8 sm:p-4 p-1 mt-16'>
              <AllComments complaintId={id}/>
              <CommentForm id={id} />
            </div>
          </div>{' '}
        </Fragment>
      </Layout>
    </Fragment>
  );
};

export default ComplaintDetails;
