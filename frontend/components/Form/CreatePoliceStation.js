import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import Snackbar from './../../utils/notistick/Snackbar';
import { useRouter } from 'next/router';
import { setLoading, unsetLoading } from '../store/ui-slice';
import { deleteImages } from '../store/complaintSlice';
import DropImage from './DropImage';
import { setPoliceStations } from '../store/policeStationsSlice';
import { usePoliceStation } from '../../utils/hooks';

const CREATE_POLICE_STATION = gql`
  mutation (
    $input: StationInput!
    $location: LocationInput!
    $image: [Upload]
  ) {
    policeStationCreate(input: $input, location: $location, image: $image) {
      userErrors {
        message
      }
      policeStation {
        name
        number
        address
        postalCode
        location {
          coordinates
        }
      }
    }
  }
`;

export default function CreatePoliceStation() {
  const [policeStationCreate, { data, error, loading }] = useMutation(
    CREATE_POLICE_STATION
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.complaint.images);
  const { policeStations } = usePoliceStation();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoading());
    const formData = new FormData(event.currentTarget);
    const lat = Number(formData.get('lat'));
    const lng = Number(formData.get('lng'));
    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
    policeStationCreate({
      variables: {
        input: {
          name: formData.get('name'),
          description: formData.get('description'),
          street: formData.get('street'),
          address: formData.get('address'),
          number: Number(formData.get('number')),
          postalCode: Number(formData.get('postalCode')),
        },
        location,
        image: image,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.policeStationCreate.userErrors.length) {
        dispatch(unsetLoading());
        Snackbar.error(data.policeStationCreate.userErrors[0].message);
      } else {
        dispatch(unsetLoading());
        dispatch(deleteImages());
        Snackbar.success('Police Station created');
        if(policeStations) dispatch(setPoliceStations(policeStations));
        // router.push('/login');
      }
    }
  }, [data]);

  //

  //
  return (
    <Grid container className='dark:bg-gray-500'>
      <Container
        component='main'
        maxWidth='xs'
        className='dark:bg-gray-300 bg-gray-100 rounded-lg'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar className='bg-green-400'>
            <DevicesOtherIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create Police Station Profile
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Station Name'
              name='name'
              autoComplete='name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='description'
              label='Station Description'
              name='description'
              autoComplete='description'
              defaultValue='Raozan Thana (Chittagong metropolitan) '
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='number'
              label='Mobile Number'
              name='number'
              autoComplete='number'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='address'
              label='Address'
              type='text'
              id='address'
              autoComplete='address'
              defaultValue='Raozan,Chittagong, 4210'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='street'
              label='Street'
              type='text'
              id='street'
              autoComplete='street'
              defaultValue='Raozan,Chittagong, 4210'
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='postalCode'
              label='Postal Code'
              type='number'
              id='postalCode'
              autoComplete='current-postalCode'
              defaultValue={4340}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              id='lng'
              label='Longtitude'
              name='lng'
              autoComplete='lng'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lat'
              label='Lattitude'
              name='lat'
              autoComplete='number'
            />
            <DropImage maximumImage={1} />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              className='bg-green-400 hover:bg-green-500'
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
