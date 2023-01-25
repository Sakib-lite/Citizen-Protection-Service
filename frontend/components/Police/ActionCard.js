import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { COMPLAINT_UPDATE } from '../../utils/schema';

const ActionCard = ({ status }) => {

  const router = useRouter();
  const { slug } = router.query;

  const [update] = useMutation(COMPLAINT_UPDATE);

  const solveHandler = () => {
    update({
      variables: {
        status: 'solved',
        complaintUpdateId: slug,
      },
    });

    router.push(router.asPath);
  };

  return (
    <Fragment>
      <Grid item md={3} xs={12}>
        <Card className='dark:bg-gray-300 '>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className='text-gray-500 dark:text-gray-800 sm:text-md text-xl'>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className='text-gray-500 dark:text-gray-800  sm:text-md text-xl uppercase '>
                    {status}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={solveHandler}
              >
                Mark as Solved
              </Button>
            </ListItem>
          </List>
        </Card>
    
      </Grid>
    </Fragment>
  );
};

export default ActionCard;
