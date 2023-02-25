import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const AllComments = ({complaintId}) => {
  
  const comments=useSelector(state=>state.comments.comments)
  if(comments.length===0)return <p className='mt-2 text-gray-700 text-2xl'>No comment yet</p>
  return (
    <Fragment>
      <div className='grid grid-cols-1 mt-8 lg:grid-cols-2 gap-x-16 gap-y-12'>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              comment={comment.comment}
              name={comment.author.name}
              image={comment.author.image}
              authorId={comment.author.id}
              createdAt={comment.createdAt}
              complaintId={complaintId}
              reported={comment.reported}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default AllComments;
