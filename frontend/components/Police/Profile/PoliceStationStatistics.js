import React, { Fragment } from 'react';

const PoliceStationStatistics = ({complaints}) => {

const pendingComplaints=complaints.filter((cmplt)=>cmplt.status==='pending').length
const solvedComplaints=complaints.length-pendingComplaints

  return (
    <Fragment>
      <div className='flex-1 bg-white rounded-lg shadow-xl mt-4 p-8'>
        <h4 className='text-xl text-gray-900 font-bold'>Statistics</h4>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4'>
          <div className='px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl'>
            <div className='flex items-center justify-between'>
              <span className='font-bold text-sm text-indigo-600'>
                Total Complaints
              </span>
              <span className='text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default'>
               
              </span>
            </div>
            <div className='flex items-center justify-between mt-6'>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-indigo-600 w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>

              </div>
              <div className='flex flex-col'>
                <div className='flex items-end'>
                  <span className='text-2xl 2xl:text-3xl font-bold'>
                    {complaints.length}
                  </span>
                  <div className='flex items-center ml-2 mb-1'>
                    <svg
                      className='w-5 h-5 text-green-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      ></path>
                    </svg>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl'>
            <div className='flex items-center justify-between'>
              <span className='font-bold text-sm text-red-600'>
              Pending Complaints
              </span>
            
            </div>
            <div className='flex items-center justify-between mt-6 mx-auto'>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

              </div>
              <div className='flex flex-col'>
                <div className='flex items-end'>
                  <span className='text-2xl 2xl:text-3xl font-bold'>{pendingComplaints}</span>
                 
                </div>
              </div>
            </div>
          </div>
          <div className='px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl'>
            <div className='flex items-center justify-between'>
              <span className='font-bold text-sm text-green-600'>
              Solved Complaints
              </span>
             
            </div>
            <div className='flex items-center justify-between mt-6'>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>

              </div>
              <div className='flex flex-col'>
                <div className='flex items-end'>
                  <span className='text-2xl 2xl:text-3xl font-bold'>{solvedComplaints}</span>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PoliceStationStatistics;
