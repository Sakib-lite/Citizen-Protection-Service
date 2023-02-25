import React, { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUserTable } from '../../../utils/hooks';
import UserHandler from './UserHandler';
import IsReported from '../../UserProfile/IsReported';

export default function  UserTable() {

  const { users, loading, error } = useUserTable();  



  return (
    <Fragment>
      <TableContainer component={Paper} className='dark:bg-gray-300 '>
        <Table sx={{ minWidth: 360 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
           
              <TableCell>Name</TableCell>
              <TableCell align='center'>Complaints</TableCell>
              <TableCell align='center'>Role</TableCell>
              <TableCell align='center'>Reported</TableCell>
              <TableCell align='center'>Ban</TableCell>
              <TableCell align='center'>Unban</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && !error && users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                 
                    <a>{user.name}</a>
                 
                </TableCell>
                <TableCell align='center'>{user.complaints && user.complaints.length}</TableCell>
                <TableCell align='center' className='uppercase'>{user.role}</TableCell>
            <IsReported user={user}/>

                <UserHandler user={user} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </Fragment>
  );
}