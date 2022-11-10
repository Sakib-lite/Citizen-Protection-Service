import React, { Fragment } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const LocationDetails = ({ complaint }) => {
const dispatch=useDispatch()
const router = useRouter();
  const clickHandler = () => {
    router.push(`/complaint/${complaint.id}`)
  };

  return (
    <Fragment>
      <IconButton onClick={clickHandler} className='text-red-800'>
        <LocationOnOutlinedIcon />
      </IconButton>
    </Fragment>
  );
};

export default LocationDetails;
