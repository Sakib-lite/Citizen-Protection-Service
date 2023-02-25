import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ActionCard from './ActionCard';

const PoliceStationCard = ({
  image,
  name,
  status,
  address,
  description,
  stationId,
}) => {
  const featuredImage =
    image ||
    'https://res.cloudinary.com/dlgajwgag/image/upload/v1673758850/test/icons8-no-image-100_u6u3ob.png';
    const user=useSelector(state=>state.auth.user)
  return (
    <Fragment>
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-300 dark:bg-gray-300'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='lg:pr-10'>
            <h3 className='mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-800'>
              {' '}
              This complaint is under
              <p className='inline-block text-purple-400 ml-1'>{name}</p> now
            </h3>{' '}
            <p className='font-medium text-md  text-gray-900 dark:text-gray-800'>
              {description}
            </p>
            <hr className='mb-5 border-gray-300' />
            <div className='my-6 w-2/3 mx-auto'>
         {
        user?.role==='admin' &&     <ActionCard id={stationId} status={status} />
        }
          
            </div>
          </div>
          <div>
            <img
              className='object-cover w-full h-56 rounded shadow-lg sm:h-96'
              src={featuredImage}
              alt=''
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PoliceStationCard;
