import React, { Fragment } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

export default function CardComponent({ complaint }) {
  let { title, description, images, id, status } = complaint;

  const dispatch = useDispatch();
  const image =
    (images.length > 0 && complaint?.images[0]) ||
    'https://res.cloudinary.com/dlgajwgag/image/upload/v1673864243/test/pngwing.com_buuhxy.png';

  return (
    <Fragment>
      <Paper elevation={3}>
        <Card className='bg-gray-300 dark:bg-gray-500 my-2 hover:shadow-2xl '>
          <Link href={`/complaint/${id}`} passHref>
            <CardActionArea>
              <div className='justify-center items-center mx-auto flex w-72 h-64 '>
                <Image
                  src={image}
                  alt='complaint'
                  width='400'
                  height='300'
                  className='w-full rounded-lg'
                />
              </div>
            </CardActionArea>
          </Link>

          <div className='rounded-t-lg p-4 bg-gray-100 dark:bg-gray-700 flex flex-col w-full'>
            <div>
              <h5 className='dark:text-white text-gray-900 md:text-2xl text-xs sm:text-lg font-bold leading-none line-clamp-1 '>
                {title}
              </h5>
              <span className='text-xs text-gray-400 leading-none line-clamp-1 my-4'>
                {description}
              </span>
            </div>

            <div className='dark:text-white text-gray-900 text-sm font-bold uppercase'>
              Status : {status}
            </div>
          </div>
        </Card>
      </Paper>
    </Fragment>
  );
}
