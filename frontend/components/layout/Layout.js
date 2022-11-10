import Head from 'next/head';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../header/Header';



export default function Layout({ children }) {
const dispatch = useDispatch()



  return (
    <Fragment>
      <Head>
        <title> Citizen Protection Service</title>
      </Head>
      <div className='bg-gray-100'>
        <div>
        <Header />
          {children}
        </div>
      </div>
    </Fragment>
  );
}
