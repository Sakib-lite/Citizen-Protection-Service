import React, { Fragment } from 'react';
import CreatePoliceStation from '../../components/Form/CreatePoliceStation';
import Layout from '../../components/layout/Layout';

const CreateStationPage = () => {
  return (
    <Fragment>
      <Layout>
        <CreatePoliceStation />
      </Layout>
    </Fragment>
  );
};

export default CreateStationPage;
