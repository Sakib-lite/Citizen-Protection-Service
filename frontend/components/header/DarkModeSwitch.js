import React, { Fragment, useEffect } from 'react'
import { useTheme } from 'next-themes';
import Switch from '@mui/material/Switch';

export default function DarkModeSwitch() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => {
      setMounted(true);

    }, [theme]);
    const darkModeToggleHandler = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    if(!mounted) return null;
  return (
  <Fragment
  >
  <Switch onChange={darkModeToggleHandler} color='default' />
      
  </Fragment>
  )
}
