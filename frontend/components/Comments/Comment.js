import React, { Fragment, useState } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import DeleteComment from './DeleteComment';
import { useSelector } from 'react-redux';
import ReportComment from './ReportComment';

const Comment = ({
  image,
  name,
  comment,
  createdAt,
  authorId,
  id,
  complaintId,
  reported,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const reportedComment = reported ? 'border-red-500 ' : 'border-gray-500 ';

  return (
    <Fragment>
      <blockquote
        className={`${reportedComment} border-2 p-2 relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-center mb-4 space-x-4'>
          <Avatar sx={{ width: 32, height: 32 }} src={image} />
          <div className='space-y-1 font-medium '>
            <p>{name} </p>
          </div>
        </div>

        <p className='mt-2 text-gray-700 '>{comment}</p>

        <footer className='mt-4'>
          <p className='text-xs text-gray-500 '>
            {createdAt?.substring(0, 10)}
          </p>
        </footer>
        {isHovering && (user.role !== 'user' || authorId === user.id) && (
          <div className='absolute top-0 right-0'>
            <DeleteComment id={id} complaintId={complaintId} />
          </div>
        )}
        {isHovering && user.role === 'user' && authorId !== user.id && (
          <div className='absolute top-0 right-0'>
            <ReportComment id={id} />
          </div>
        )}
      </blockquote>
    </Fragment>
  );
};

export default Comment;
