import React ,{Fragment , useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DarkModeSwitch from './DarkModeSwitch';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSelector } from 'react-redux';
import Link from 'next/link'
import UserAvatar from './UserAvatar';

export default function DropDownList() {
  const [open, setOpen] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
        <div className='flex'>   <DarkModeSwitch /><div className='sm:hidden'> {isLoggedIn && <UserAvatar />}</div> </div>
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton> 

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Category' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
     
      
        <Link href='/all-complaints' passHref><ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='All Complaints' />
          </ListItemButton></Link>
         <Link href='/police-stations/create-policestation' passHref><ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=' Create Station' />
          </ListItemButton></Link>
          <Link href='/police-stations' passHref><ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Police Stations' />
          </ListItemButton></Link>
        </List>
      </Collapse>

      {!isLoggedIn && (
        <Fragment>
        
          <Link href='/signup' passHref><ListItemButton>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary='Register' />
          </ListItemButton></Link>
          <Link href="/login" passHref><ListItemButton>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary='Log in' />
          </ListItemButton></Link>
        </Fragment>
      )}
    </List>
  );
}
