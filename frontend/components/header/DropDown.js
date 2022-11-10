import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';

export default function DropDown() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader
          component='div'
          id='nested-list-subheader'
        ></ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary='Notification' />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary='User' />
      </ListItemButton>

      <ListItemButton>
        <Button className='bg-pink-500 text-gray-100 hover:bg-pink-300 text-xs'>
          Upload all related{' '}
        </Button>
      </ListItemButton>
    </List>
  );
}
