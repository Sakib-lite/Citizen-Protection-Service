import React, { Fragment } from 'react';

const PoliceStation = ({ id,name,description,status }) => {
  return (
    <Fragment>
      <div className='bg-gray-100  h-3/4'>
        <div className='container '>
          <div className=' gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='p-5 bg-white border-2 border-white shadow-sm hover:border-green-400 transition rounded-lg'>
              <svg
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='text-green-500 mb-5 hi-outline hi-template inline-block w-12 h-12'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
                ></path>
              </svg>
              <h4 className='text-lg font-bold mb-2'>
              {name}
              </h4>
              <p className='leading-relaxed text-gray-600'>
             Description:   {description}
              </p>
{status ? ( <p className='leading-relaxed text-gray-600'>
               Status: {status}
              </p>):null }

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PoliceStation;
