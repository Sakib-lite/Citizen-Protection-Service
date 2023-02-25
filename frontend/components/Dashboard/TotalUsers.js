import React,{Fragment} from "react"
import { useTotalUsers } from "../../utils/hooks";

const TotalUsers = () => {
      
    const { users, loading, error } = useTotalUsers()  
      
  return (
    <Fragment>
       <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
                  {/* <!--Metric Card--> */}
                  <div className='bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5'>
                    <div className='flex flex-row items-center'>
                      <div className='flex-shrink pr-4'>
                        <div className='rounded-full p-5 bg-pink-600'>
                          <i className='fas fa-users fa-2x fa-inverse'></i>
                        </div>
                      </div>
                      <div className='flex-1 text-right md:text-center'>
                        <h2 className='font-bold uppercase text-gray-600'>
                          Total Users
                        </h2>
                        <p className='font-bold text-3xl'>
                         {users && users.length}
                          <span className='text-pink-500'>
                            <i className='fas fa-exchange-alt'></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!--/Metric Card--> */}
                </div>
    </Fragment>
  )
};

export default TotalUsers;
