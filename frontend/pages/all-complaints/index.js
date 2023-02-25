import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllCards from '../../components/Card/AllCards';
import Layout from '../../components/layout/Layout';
import { setComplaint } from '../../components/store/complaintSlice';
import { setLoading, unsetLoading } from '../../components/store/ui-slice';
import { useComplaint } from '../../utils/hooks';

const AllComplaints = () => {

  const [complaints,setComplaints]=useState([])
  const dispatch=useDispatch()
  const { complaints:cmplts, loading:complaintLoading } = useComplaint();
  useEffect(() => {
    if (cmplts) setComplaints(cmplts)
  }, [cmplts]);

  useEffect(()=>{
    if(complaintLoading)dispatch(setLoading())
    else if(!complaintLoading)dispatch(unsetLoading())
    else dispatch(unsetLoading())
    },[complaintLoading])
  return (
    <Fragment>
      <Layout>
        <AllCards complaints={complaints} />
      </Layout>
    </Fragment>
  );
};

export default AllComplaints;
