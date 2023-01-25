import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from '../../components/Form/LoginForm';
import Box from '@mui/material/Box';
import Loading from '../../components/layout/Loading';


const Login = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.ui.loading);
  const { redirect } = router.query; 
  
  useEffect(() => {
    if (user) router.push(redirect || '/');
  }, [redirect, router, user]);

  return (
    <Fragment>
     
        <Box
          height='100vh'
          display='flex'
          flexDirection='column'
          className='dark:bg-gray-500'
        >
          <div className='flex justify-center py-6'>
          </div>
          <LoginPage />
          {loading &&      <Loading/>}
        </Box>
      
    </Fragment>
  );
};

export default Login;
