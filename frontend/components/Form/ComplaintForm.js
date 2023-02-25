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
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setLoading, unsetLoading, unsetShowModal } from '../store/ui-slice';
import { gql, useMutation } from '@apollo/client';
import Snackbar from './../../utils/notistick/Snackbar';
import { useComplaint } from '../../utils/hooks';
import { deleteImages, addComplaint } from '../store/complaintSlice';
import DropImage from './DropImage';
import { useRouter } from 'next/router';

const COMPLAINT = gql`
  mutation (
    $input: ComplaintInput!
    $location: LocationInput!
    $images: [Upload]
  ) {
    complaintCreate(input: $input, location: $location, images: $images) {
      userErrors {
        message
      }
      complaint {
        id
        title
        description
        images
        status
        location {
          coordinates
        }
        policeStation {
          id
        }
      }
    }
  }
`;

export default function ComplaintForm() {
  const [complaintType, setComplaintType] = React.useState(true);
  const [complaintCreate, { data }] = useMutation(COMPLAINT);
  const coordinates = useSelector((state) => state.location.coordinates);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { complaints, loading } = useComplaint();
  const images = useSelector((state) => state.complaint.images);
  const router = useRouter();

  const changeComplaintType = (type) => {
    setComplaintType(type);
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      // if (!user) {
      //   Snackbar.error('Please login first');
      //   return;
      // }
      const formData = new FormData(event.currentTarget);
      dispatch(setLoading());
      complaintCreate({
        variables: {
          input: {
            title: formData.get('title'),
            description: formData.get('description'),
            public: complaintType,
          },
          location: {
            type: 'Point',
            coordinates: coordinates,
          },
          images: images,
        },
      });
    } catch (e) {
      dispatch(unsetLoading());
    }
  };

  const handleClick = (e) => {
    dispatch(unsetShowModal());
    console.log('close');
    dispatch(deleteImages());
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (data) {
      if (data.complaintCreate.userErrors.length) {
        dispatch(unsetLoading());
        Snackbar.error(data.complaintCreate.userErrors[0].message);
      } else {
        dispatch(unsetLoading());
        Snackbar.success('Complaint Created');
        dispatch(addComplaint(data.complaintCreate.complaint));
        dispatch(unsetShowModal());
        dispatch(deleteImages());
        router.push(router.asPath);
      }
    }
  }, [data]);

  return (
    <Grid container className='bg-transparent'>
      <Container
        component='div'
        maxWidth='xs'
        className='dark:bg-gray-300 bg-gray-100 rounded-lg h-full '
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

<div className='my-2'>
                <InputLabel id='demo-simple-select-label'>Public</InputLabel>
                <Select
                  onChange={(event) => changeComplaintType(event.target.value)}
                  value={complaintType}
                  label='Public'
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
            {/* drop images */}
            <DropImage maximumImage={5} />

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
