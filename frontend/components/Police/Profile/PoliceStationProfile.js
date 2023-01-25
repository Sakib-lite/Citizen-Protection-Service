import React, { Fragment } from 'react';
import Beneficiaries from './Beneficiaries/Beneficiaries';
import PoliceStationAbout from './PoliceStationAbout';
import PoliceStationInfo from './PoliceStationInfo';
import PoliceStationStatistics from './PoliceStationStatistics';
import ProfileHeader from './ProfileHeader';

const PoliceStationProfile = ({policeStation}) => {

const {name,street,description,address,number,image,complaints}=policeStation

  return (
    <Fragment>
      <div className='h-full bg-gray-200 p-8'>
        <ProfileHeader name={name} street={street} image={image} />
        <div className='my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4'>
          <PoliceStationInfo name={name} address={address} number={number} description={description} />
          <div className='flex flex-col w-full 2xl:w-2/3'>
            <PoliceStationAbout />
            <PoliceStationStatistics complaints={complaints}/>
          </div>
        </div>
        {/* <Beneficiaries /> */}
      </div>
    </Fragment>
  );
};

export default PoliceStationProfile;
