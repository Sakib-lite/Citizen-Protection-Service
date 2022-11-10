import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from '../../components/Form/LoginForm';
import Layout from '../../components/layout/Layout';
import Box from '@mui/material/Box';


const Login = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { redirect } = router.query; 
  useEffect(() => {
    if (user) router.push(redirect || '/');
  }, [redirect, router, user]);

  return (
    <Fragment>
      <Layout>
        <Box
          height='100vh'
          display='flex'
          flexDirection='column'
          className='dark:bg-gray-500'
        >
          <div className='flex justify-center py-6'>
          </div>
          <LoginPage />
        </Box>
      </Layout>
    </Fragment>
  );
};

export default Login;
