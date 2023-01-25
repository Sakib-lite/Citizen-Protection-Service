import React, { Fragment } from 'react';
import CardComponent from './CardComponent';
import Grid from '@mui/material/Grid';

export default function AllCards({ complaints }) {
  return (
    <Fragment>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 8 }}
        className='mb-10 pt-4 gap-5 justify-center'
      >
        {complaints.map((complaint) => (
          <Grid item xs={2} sm={4} md={2} key={complaint.id}>
            <CardComponent complaint={complaint} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
