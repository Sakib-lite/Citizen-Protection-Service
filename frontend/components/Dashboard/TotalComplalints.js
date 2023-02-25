import React,{Fragment} from "react"
import { useComplaintByStatus } from "../../utils/hooks";



const TotalComplaints = ({status='all',bgColor='green',heading}) => {
    const { complaints, loading, error } = useComplaintByStatus(status);  


  return (
    <Fragment>
        <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
                  {/* <!--Metric Card--> */}
                  <div className={`bg-gradient-to-b from-${bgColor}-200 to-${bgColor}-100 border-b-4 border-${bgColor}-600 rounded-lg shadow-xl p-5`}>
                    <div className='flex flex-row items-center'>
                      <div className='flex-shrink pr-4'>
                        <div className={`rounded-full p-5 bg-${bgColor}-600`}>
                          <i className='fa fa-wallet fa-2x fa-inverse'></i>
                        </div>
                      </div>
                      <div className='flex-1 text-right md:text-center'>
                        <h2 className='font-bold uppercase text-gray-600'>
                          {heading} Complaints
                        </h2>
                        <p className='font-bold text-3xl'>
                          {complaints || null}
                          <span className={`text-${bgColor}-500`}>
                            <i className='fas fa-caret-up'></i>
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

export default TotalComplaints;
