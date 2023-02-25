import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllCards from '../../components/Card/AllCards';
import Layout from '../../components/layout/Layout';
import { setLoading, unsetLoading } from '../../components/store/ui-slice';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useGetUser } from '../../utils/hooks';
import Snackbar from '../../utils/notistick/Snackbar';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useGetUser();

  useEffect(() => {
    if (loading) dispatch(setLoading());
    else dispatch(unsetLoading());
  }, [loading,dispatch]);

  if (error) {
    Snackbar.error('You are not allowed to access this page');
    router.push('/login');
  }

  return (
    <Fragment>
      <Layout>
        {user && (
          <Fragment>
            <UserProfile user={user} />
            <AllCards complaints={user.complaints} />
          </Fragment>
        )}
      </Layout>
    </Fragment>
  );
};

export default Profile;
