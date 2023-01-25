import React, { Fragment } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { unsetShowModal } from '../store/ui-slice';

const LocationDetails = ({ complaint }) => {

  const styles = {

    largeIcon: {
      width: 150,
      height: 150,
    },
  
  };
  
const dispatch=useDispatch()
const router = useRouter();
  const clickHandler = (e) => {
    e.stopPropagation();
    dispatch(unsetShowModal())
    router.push(`/complaint/${complaint.id}`)
  };

  return (
    <Fragment>
      <IconButton onClick={clickHandler} className='animate-bounce text-green-800 p-4 justify-center items-center bg-green-800 bg-opacity-30 '>
        <LocationOnOutlinedIcon   fontSize='large'
 />

      </IconButton>
    </Fragment>
  );
};

export default LocationDetails;
