import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { COMMENT_DELETE } from '../../utils/schema';
import { useMutation } from '@apollo/client';
import { useComplaintComments } from '../../utils/hooks';
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setComment } from '../store/commentSlice';

function removeObjectWithId(arr, id) {
  arr=arr.filter(item => item.id !== id);

  return arr;
}

export default function DeleteComment({ id,complaintId }) {
  const [commentDelete, { data, error, loading }] = useMutation(COMMENT_DELETE);
  const comments=useSelector(state=>state.comments.comments)
const dispatch=useDispatch()

  const deleteHandler = () => {
    commentDelete({
      variables: {
        id,
      },
    });

const newComments=removeObjectWithId(comments,id)

dispatch(setComment(newComments))
    
  };

  return (
    <Tooltip title='Delete'>
      <IconButton onClick={deleteHandler}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
