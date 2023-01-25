import React, { Fragment } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { useSelector } from 'react-redux';


export default function CartIcon() {

  return (
    <Fragment>
     <Link href='/cart' passHref><IconButton size='large' >
      <Badge badgeContent={10} color='warning'>
      <ShoppingCartCheckoutIcon className='text-gray-500 dark:text-gray-100'/>
    </Badge>  

     </IconButton></Link>
    </Fragment>
  );
}
