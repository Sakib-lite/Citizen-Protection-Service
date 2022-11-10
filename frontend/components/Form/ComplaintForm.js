import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import { unsetShowModal } from '../store/ui-slice';
import { gql, useMutation } from '@apollo/client';
import Snackbar from './../../utils/notistick/Snackbar';

const COMPLAINT = gql`
  mutation ($input: ComplaintInput!, $location: LocationInput!) {
    complaintCreate(input: $input, location: $location) {
      userErrors {
        message
      }
      complaint {
        id
        title
        description
        location {
          coordinates
        }
      }
    }
  }
`;

export default function ComplaintForm() {
  const [complaintCreate, { data }] = useMutation(COMPLAINT);
  const coordinates = useSelector((state) => state.location.coordinates);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user){
      Snackbar.error('Please login first');
return
    } 
    const formData = new FormData(event.currentTarget);

    complaintCreate({
      variables: {
        input: {
          title: formData.get('title'),
          description: formData.get('description'),
          public: true,
          photos: 's.jpg',
        },
        location: {
          type: 'Point',
          coordinates: coordinates,
        },
      },
    });

  };

  const handleClick = () => {
    console.log("close");
    dispatch(unsetShowModal());
  };

  React.useEffect(() => {
    if (data) {
      if (data.complaintCreate.userErrors.length) {
        Snackbar.error(data.complaintCreate.userErrors[0].message);
      } else {
        Snackbar.success('Complaint Created');
        dispatch(unsetShowModal());
      }
    }
  }, [data]);

  return (
    <Grid container className='bg-transparent'>
      <Container
        component='main'
        maxWidth='xs'
        className='dark:bg-gray-300 bg-gray-100 rounded-lg'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='flex w-full'>
            <button className='ml-auto' onClick={handleClick}>
              <CancelIcon />
            </button>
          </div>
          <div className='flex items-center space-x-2'>
            <Typography component='h1' variant='h5'>
              Complain Box
            </Typography>
            <Avatar className='bg-green-400'>
              <TakeoutDiningIcon />
            </Avatar>
          </div>
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
              id='title'
              label='Title'
              name='title'
              autoComplete='title'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='description'
              label='Description'
              name='description'
              autoComplete='description'
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='cell'
              label='Photos'
              type='number'
              id='cell'
              autoComplete='mobile-number'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='cell'
              label='Public'
              type='number'
              id='cell'
              autoComplete='true'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              className='bg-green-400 hover:bg-green-500'
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
