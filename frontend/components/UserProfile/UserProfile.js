import React, { Fragment } from 'react';
import PoliceStationAbout from '../Police/Profile/PoliceStationAbout';
import PoliceStationInfo from '../Police/Profile/PoliceStationInfo';
import PoliceStationStatistics from '../Police/Profile/PoliceStationStatistics';
import ProfileHeader from '../Police/Profile/ProfileHeader';


const UserProfile = ({user}) => {

const {name,number,image,complaints}=user

  return (
    <Fragment>
      <div className='h-full bg-gray-200 p-8'>
        <ProfileHeader name={name} image={image}  />
        <div className='my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4'>
          <PoliceStationInfo name={name}  number={number}  />
          <div className='flex flex-col w-full 2xl:w-2/3'>
            <PoliceStationStatistics complaints={complaints}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
