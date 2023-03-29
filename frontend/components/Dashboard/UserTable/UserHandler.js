import React, { Fragment } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import { useMutation } from '@apollo/client';
import { USER_UPDATE } from '../../../utils/schema';
import Snackbar from '../../../utils/notistick/Snackbar';

export default function UserHandler({ user }) {
    const [userUpdate, { data, error, loading }] = useMutation(USER_UPDATE );

const banHandler =()=>{
if(user.role!=='user' || user.banned) return
    userUpdate({
        variables: {
          input: {
          banned: !user.banned
          },
          id: user.id,
        },
      });
  Snackbar.error(`${user.name} is banned now`)
}

const unbanHandler =()=>{
    if(user.role!=='user' || !user.banned) return
    userUpdate({
        variables: {
          input: {
          banned: !user.banned
          },
          id: user.id,
        },
      });
      Snackbar.success(`${user.name} is unbanned`)
}


const disableBanButton= user.role!=='user' || user.banned  ? 'cursor-not-allowed  opacity-50':'';
const disableUnbanButton= user.banned ? '':'cursor-not-allowed opacity-50 '

  return (
    <Fragment>
      <TableCell align='center'>
        <IconButton className={disableBanButton} onClick={banHandler}>
         <AddCircleOutlineIcon />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <IconButton className={disableUnbanButton} onClick={unbanHandler}>
       <RemoveCircleOutlineIcon />
        </IconButton>{' '}
      </TableCell>
    </Fragment>
  );
}