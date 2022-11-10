import AppBar from '@mui/material/AppBar';
import React, { Fragment, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import img from '../../public/logo-1.png';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
import Link from 'next/link';
import { useStyles } from '../../utils/styles';
import DropDown from './DropDown';
import Search from './Search/Search';
import Icons from './Icons';

export default function Header() {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:768px)');
  const [openDrawer, setOpenDrawer] = useState(false);

  //for tab and mobile
  const drawer = (
    <Fragment>
      <SwipeableDrawer
        anchor='right'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        disableBackdropTransition
        disableDiscovery
        classes={{ paper: classes.drawer }}
      >
       {/* icons and upload button components in the dropdown component*/}
        <DropDown />
      </SwipeableDrawer>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position='sticky' className='bg-white md:px-2 py-1  mb-4'>
        <Toolbar>
          <Link href='/'>
            <a className=' items-center '>
              <div className='md:w-24 ml-2 md:ml-6 lg:ml-10 w-10 mr-4'>
             {/* logo */}
             <Link href='/' passHref><a className='text-gray-800'>Home</a></Link>
              </div>
            </a>
          </Link>
          <div className='flex w-full'>
            <div className='mx-auto text-gray-800 space-x-5'>
             <Link href='/login' passHref><a>Login</a></Link>
             <Link href='/signup' passHref><a>Signup</a></Link>
            </div>

            {/* remaining components will be hidden in dropdown. */}
            {!matches && (
              <div className='flex items-center'>
                <div className='flex ml-auto'>
                  {/* icons and upload button component */}
                  <Icons />
                </div>
              </div>
            )}
            {/* logic for responsive ui for maobile and tab. under 768px drawer will be visible */}
            {matches ? (
              <Fragment>
                <IconButton
                  className='text-gray-800 ml-auto'
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  {/* dropdown button */}
                  <ViewHeadlineOutlinedIcon />
                </IconButton>
              </Fragment>
            ) : null}
            {drawer}
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
