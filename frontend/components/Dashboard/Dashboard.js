import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import TotalComplaints from './TotalComplalints';
import TotalUsers from './TotalUsers';
import TotalComments from './TotalComments';
import axios from 'axios';
import Chart from './Chart';
import UserTable from './UserTable/UserTable';


const Dashboard = () => {



  return (
    <Fragment>
      <main>
        <div className='flex flex-col md:flex-row'>
          <section>
            <div
              id='main'
              className='main-content flex-1 bg-gray-100  pb-24 md:pb-5'
            >
              <div className='bg-gray-800 pt-3 flex justify-between'>
                <div className='rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white'>
                  <h1 className='font-bold pl-2'>Admin Dashboard</h1>
                </div>
                <Link href='/' passHref>
                  <Button className='text-gray-200 bg-gray-900 hover:bg-gray-600 px-2 py-2 mr-2 '>
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className='flex flex-wrap'>
              <TotalComplaints status='all' bgColor='yellow' heading='TOTAL'/>
               <TotalUsers/>
               <TotalComplaints status='pending' bgColor='red' heading='PENDING'/>
               <TotalComments/>
                <TotalComplaints status='solved' bgColor='green' heading='SOLVED'/>
              </div>

              <div className='flex flex-row flex-wrap flex-grow mt-2'>
                

                <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
                  {/* <!--Advert Card--> */}
                 


                  {/* <!--/Advert Card--> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      <Chart />  
   <div className="mx-10 py-10 bg-gray-100 px-4 mt-10">
    <h2 className="flex items-center justify-center text-gray-700 text-4xl font-semibold mb-4">Users</h2>
       <UserTable/>
    </div>
      </main>
    </Fragment>
  );
};

export default Dashboard;
