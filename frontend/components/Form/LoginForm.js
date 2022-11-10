import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import Snackbar from './../../utils/notistick/Snackbar';
import { setUserDetails } from '../store/authSlice';

const SIGNIN = gql`
  mutation ($credentials: Credentials!) {
    signin(credentials: $credentials) {
      userErrors {
        message
      }
      token
      user {
      id
      name
      number
    }
    }
  }
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const [signin, { data, error, loading }] = useMutation(SIGNIN);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signin({
      variables: {
        credentials: {
          number: Number(data.get('number')),
          password: data.get('password'),
        },
      },
    });
  };

  React.useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        Snackbar.error(data.signin.userErrors[0].message);
      }
      if (data.signin.token) {
        localStorage.setItem('token', data.signin.token);
        dispatch(setUserDetails(data.signin.user))
        Snackbar.success('Logged In');
      }
    }
  }, [data]);

  return (
    <Container
      component='main'
      maxWidth='xs'
      className='dark:bg-gray-300 bg-gray-100 rounded-lg pb-4'
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='number'
            label='Mobile Number'
            name='number'
            autoComplete='number'
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
            defaultValue='123456'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            className='bg-green-400 hover:bg-green-500 '
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/forget-password' passHref>
                <a className='text-blue-500 darK:text-blue-500 hover:text-blue-800'>
                  Forgot password?
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' passHref>
                <a className='text-blue-500 darK:text-blue-500 hover:text-blue-800'>
                  {"Don't have an account? Sign Up"}
                </a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
