import React, { useState ,useEffect} from 'react';
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
import DropImage from './DropImage';
import { setLoading, unsetLoading } from '../store/ui-slice';
import { deleteImages } from '../store/complaintSlice';


const SIGNUP = gql`
  mutation ($credentials: Credentials!, $name: String!,$image: [Upload]) {
    signup(credentials: $credentials, name: $name,image:$image) {
      userErrors {
        message
      }
      token
    }
  }
`;

export default function SignUpPage() {

  const [signup, { data, error, loading }] = useMutation(SIGNUP);
const router= useRouter()
  const image = useSelector((state) => state.complaint.images);
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
   dispatch(setLoading());
    const formData = new FormData(event.currentTarget);

    signup({
      variables: {
        credentials: {
          number: Number(formData.get('number')),
          password: formData.get('password'),
        },
        name: formData.get('name'),
        image: image,
      },
    });


  };


  useEffect(() => {
    if (data) {
      if (data.signup.userErrors.length) {
           dispatch(unsetLoading());
        Snackbar.error(data.signup.userErrors[0].message)
      }else {
           dispatch(unsetLoading());
           dispatch(deleteImages());
           Snackbar.success('User created')

 router.push('/login')
         }   }
  }, [data]);


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
            Sign Up
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
              label='Full Name'
              name='name'
              autoComplete='name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='number'
              type='number'
              label='Mobile Number'
              name='number'
              autoFocus
              defaultValue={1856776675}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          {/* upload image  start*/}
         <DropImage maximumImage={1}/>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              className='bg-green-400 hover:bg-green-500'
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Grid container>
          <Grid item>
            <Link href='/login' passHref>
              <a className='text-blue-500 darK:text-blue-500 hover:text-blue-800'>
                {'Already have an account? Login'}
              </a>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
