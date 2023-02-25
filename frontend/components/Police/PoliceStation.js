import React, { Fragment } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

export default function PoliceStaion({ station }) {
  let {
    name,

    description,
    image,

    id,
    postalCode
  } = station;

  const dispatch = useDispatch();
console.log(image)
  return (
    <Fragment>
      <Paper elevation={3}>
        <Card className='bg-gray-300 dark:bg-gray-500 my-2  '>
          <Link href={`/police-stations/${id}`} passHref>
            <CardActionArea>
              <div className='justify-center items-center mx-auto flex w-72 h-64 '>
                <Image
                  src={image}
                  alt='complaint'
                  width='400'
                  height='400'
                  className='w-full rounded-lg'
                />
              </div>
            </CardActionArea>
          </Link>

          <div className='rounded-t-lg p-4 bg-gray-100 dark:bg-gray-700 flex flex-col w-full'>
            <div>
              <h5 className='dark:text-white text-gray-900 md:text-2xl text-xs sm:text-lg font-bold leading-none line-clamp-1 '>
                {name}
              </h5>
              <span className='text-xs text-gray-400 leading-none line-clamp-1 my-4'>
                {description}
              </span>
            </div>

            <div className='dark:text-white text-gray-900 text-sm font-bold uppercase'>
              Post : {postalCode}
            </div>
          </div>
        </Card>
      </Paper>
    </Fragment>
  );
}
