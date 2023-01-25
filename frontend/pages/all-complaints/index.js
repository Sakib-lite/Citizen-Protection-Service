import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import AllCards from '../../components/Card/AllCards';
import Layout from '../../components/layout/Layout';

const AllComplaints = () => {
  const complaints = useSelector((state) => state.complaint.complaints);
  return (
    <Fragment>
      <Layout>
        <AllCards complaints={complaints} />
      </Layout>
    </Fragment>
  );
};

export default AllComplaints;
