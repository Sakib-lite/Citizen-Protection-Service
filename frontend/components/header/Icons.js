import React, { Fragment } from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SendIcon from '@mui/icons-material/Send';

const Icons = () => {
  return (
    <Fragment>
<div className="space-x-4">
      <IconButton>
        <SendIcon />
         </IconButton>

      <IconButton>
        <NotificationsActiveIcon />{' '}
      </IconButton>

      <IconButton>
        <AccountCircleOutlinedIcon />{' '}
      </IconButton>

     </div>
      
    </Fragment>
  );
};

export default Icons;
