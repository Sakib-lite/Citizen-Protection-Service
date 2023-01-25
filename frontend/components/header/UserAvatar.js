import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {logout} from '../store/authSlice'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Snackbar from '../../utils/notistick/Snackbar'
import Cookies from 'js-cookie'

const UserAvatar = () => {
const router=useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  if(!user) return null;

const image=user?.image ? user.image:'https://res.cloudinary.com/dlgajwgag/image/upload/v1673944766/test/user_jwwauu.jpg'
  const dispatch = useDispatch();

  const logoutHandler = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    dispatch(logout())
    Cookies.remove('user')
  // router.replace('/login')
  Snackbar.error("You are logged out")
  };
  return (
    <Fragment>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: 40, height: 40 }} src={image}/>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Link
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
            href='/profile'
            onClick={handleClose}
          >
            My account
          </Link>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        <MenuItem>
          <Link
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
            href='/dashboard'
            onClick={handleClose}
          >
            Dashboard
          </Link>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserAvatar;
