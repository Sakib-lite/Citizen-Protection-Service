import { useRouter } from 'next/router';
import React, { Fragment,  } from 'react';
import { useSelector } from 'react-redux';
import CreatePoliceStation from '../../components/Form/CreatePoliceStation';
import Layout from '../../components/layout/Layout';

const CreateStationPage = () => {
 const router=useRouter()
  const role=useSelector(state=>state.auth?.user?.role)
 if(role==='user') router.push('/')
  return (
    <Fragment>
      <Layout>
        <CreatePoliceStation />
      </Layout>
    </Fragment>
  );
};

export default CreateStationPage;
