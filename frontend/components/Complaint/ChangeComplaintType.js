import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { COMPLAINT_UPDATE } from '../../utils/schema';

const ChangleComplaintType = ({ id, type }) => {
  const [update] = useMutation(COMPLAINT_UPDATE);
  const router = useRouter();
  const typeHandler = () => {
    update({
      variables: {
        input: {
          public: type ? false : true,
        },
        complaintUpdateId: id,
      },
    });

    router.push(router.asPath);
  };

  return (
    <Fragment>
      <button
        onClick={typeHandler}
        className='inline-block flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'
      >
        Change to <span> {type ? 'Private' : 'Public'}</span>
      </button>
    </Fragment>
  );
};

export default ChangleComplaintType;
