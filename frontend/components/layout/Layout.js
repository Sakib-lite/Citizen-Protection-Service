import Head from 'next/head';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';
import { usePoliceStation } from '../../utils/hooks';
import { setPoliceStations } from '../store/policeStationsSlice';
import Loading from './Loading';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { login } from '../store/authSlice';
import { setLoading, unsetLoading } from '../store/ui-slice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.ui.loading);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { policeStations, loading: policeStationLoading } = usePoliceStation();

  let relativeURL = '';
  const slug = router.query.slug;
  if (slug) {
    relativeURL = router.pathname.replace('[slug]', slug);
  } else {
    relativeURL = router.pathname;
    if (router.pathname.includes('[slug]')) relativeURL = '';
  }

  useEffect(() => {
    if (policeStations) dispatch(setPoliceStations(policeStations));
  }, [policeStations,dispatch]);

  useEffect(() => {
    if (!isLoggedIn && relativeURL !== '/login')
      router.push(`/login?redirect=${relativeURL}`);
  }, [isLoggedIn,relativeURL,router]);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) dispatch(login(JSON.parse(user)));
  }, [dispatch]);

  useEffect(() => {
    if (policeStationLoading &&user) dispatch(setLoading());
    else dispatch(unsetLoading());
  }, [policeStationLoading,dispatch,user]);

  return (
    <Fragment>
      <Head>
        <title> Citizen Protection Service</title>
      </Head>
      <div className='bg-white'>
        <div>
          <Header />
          {loading && <Loading />}
          {children}
        </div>
      </div>
    </Fragment>
  );
}
