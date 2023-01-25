import React, { Fragment, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SignUpPage from '../../components/Form/SignUpPage';
import Loading from '../../components/layout/Loading';

const SignUp = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.ui.loading);

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <Fragment>
      <Grid
        container
        className='dark:bg-gray-500 min-h-screen py-6'
        justifyContent='center'
      >
        <SignUpPage />
        {loading && <Loading />}
      </Grid>
    </Fragment>
  );
};

export default SignUp;
