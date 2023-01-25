import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../../../utils/styles';

const ProfileHeader = ({ image, name, street }) => {
  return (
    <Fragment>
      <div className='bg-white rounded-lg shadow-xl pb-8'>
        <div className='w-full h-[250px]'>
          <img
            src='https://res.cloudinary.com/dlgajwgag/image/upload/v1674387085/test/Dark_Blue_Modern_Discount_Banner_2_1_njsyqg.png'
            className='w-full h-44 rounded-tl-lg rounded-tr-lg object-cover'
          />
        </div>
        <div className='flex flex-col items-center -mt-20'>
          <StyledBadge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'
          >
            <Avatar src={image} sx={{ width: 240, height: 240 }} alt={name} />
          </StyledBadge>

          <div className='flex items-center space-x-2 mt-2'>
            <p className='text-2xl uppercase'>{name}</p>
            <span className='bg-blue-500 rounded-full p-1' title='Verified'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-gray-100 h-2.5 w-2.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='4'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
            </span>
          </div>
          {street && <p className='text-gray-700'>{street}</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileHeader;
