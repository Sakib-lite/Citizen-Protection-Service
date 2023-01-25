import React, { Fragment } from 'react';

const PoliceStationInfo = ({ name, description, address, number }) => {
  return (
    <Fragment>
      <div className='w-full flex flex-col 2xl:w-1/3'>
        <div className='flex-1 bg-white rounded-lg shadow-xl p-8'>
          <h4 className='text-xl text-gray-900 font-bold'>
          {description ? 'Police Station Info' : 'User Info'}  
          </h4>
          <ul className='mt-2 text-gray-700'>
            <li className='flex border-y py-2'>
              <span className='font-bold w-24'>Name:</span>
              <span className='text-gray-700'>{name}</span>
            </li>
            {description && (
              <li className='flex border-b py-2'>
                <span className='font-bold w-24'>Description: </span>
                <span className='text-gray-700 line-clamp-1'>
                  {description}
                </span>
              </li>
            )}
            {address && (
              <li className='flex border-b py-2'>
                <span className='font-bold w-24'>Address</span>
                <span className='text-gray-700'>{address}</span>
              </li>
            )}
            <li className='flex border-b py-2'>
              <span className='font-bold w-24'>Mobile:</span>
              <span className='text-gray-700'>+880{number}</span>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default PoliceStationInfo;
