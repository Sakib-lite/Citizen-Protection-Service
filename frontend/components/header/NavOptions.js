import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function NavOptions() {
  //munu strats from here
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const policeStations = useSelector(
    (state) => state.policeStations.policeStations
  );
  const role = useSelector((state) => state.auth?.user?.role);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div className='justify-center'>
        <Link href='/' passHref>
          <Button
            variant='outlined'
            className='text-gray-500 dark:text-gray-100 border-transparent hover:border-current'
          >
            {' '}
            Home{' '}
          </Button>
        </Link>
       
          <Link href='/all-complaints' passHref>
            <Button
              variant='outlined'
              className='text-gray-500 dark:text-gray-100 border-transparent hover:border-current'
            >
              All Complaints
            </Button>
          </Link>
      
       {role === 'admin' && (  <Link href='/police-stations/create-policestation' passHref>
          <Button
            variant='outlined'
            className='text-gray-500 dark:text-gray-100 border-transparent hover:border-current'
          >
            Create Station
          </Button>
        </Link>
  )}
        <Button
          variant='outlined'
          className='text-gray-500 dark:text-gray-100 border-transparent hover:border-current'
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Police Stations
        </Button>
      </div>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {policeStations.length > 0 ? (
          policeStations.map((station) => (
            <Link
              key={station.id}
              href={`/police-stations/${station.id}`}
              passHref
            >
              <MenuItem onClick={handleClose}>{station.name}</MenuItem>
            </Link>
          ))
        ) : (
          <MenuItem onClick={handleClose}>No Police Stations</MenuItem>
        )}
      </Menu>
    </Fragment>
  );
}
