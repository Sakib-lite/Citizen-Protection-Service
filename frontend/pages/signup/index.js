import React, { Fragment, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SignUpPage from '../../components/Form/SignUpPage';
import Layout from '../../components/layout/Layout';

const SignUp = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <Fragment>
      <Layout>
        <Grid container className='dark:bg-gray-500 min-h-screen py-6' justifyContent='center'>
          <SignUpPage />
        </Grid>
      </Layout>
    </Fragment>
  );
};

export default SignUp;
