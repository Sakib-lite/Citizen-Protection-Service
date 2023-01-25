import React, { Fragment, useState } from 'react';
import Snackbar from '../../utils/notistick/Snackbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setLoading, unsetLoading } from '../store/ui-slice';
import { useRouter } from 'next/router';
import { addComment } from '../store/commentSlice';

const COMMENT = gql`
  mutation ($input: CommentInput!) {
    commentCreate(input: $input) {
      comment {
        id
        comment
        createdAt
        author {
          image
          name
        }
      }
      userErrors {
        message
      }
    }
  }
`;

const CommentForm = ({ id }) => {
    const router = useRouter();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [commentCreate, { data, error, loading }] = useMutation(COMMENT);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!comment){
      Snackbar.error('Please fill up the comment field')
      return
    }
    const formData = new FormData(e.currentTarget);
    dispatch(setLoading());
    commentCreate({
      variables: {
        input: {
          comment: formData.get('comment'),
          complaintId: id,
        },
      },
    });
  };

  React.useEffect(() => {
    if (data) {
      if (data.commentCreate.userErrors.length) {
        dispatch(unsetLoading());
        Snackbar.error(data.complaintCreate.userErrors[0].message);
      } else {
        dispatch(unsetLoading());
        Snackbar.success('Comment Created');
        dispatch(addComment(data.commentCreate.comment));
        setComment('')
        // router.push(router.asPath);
      }
    }
  }, [data]);

  return (
    <Fragment>
      <form onSubmit={submitHandler} className='w-2/3 mx-auto mt-4'>
        <List>
          <ListItem>
            <Typography className='text-2xl font-meduim dark:text-gray-100'>
              Leave your Comment
            </Typography>
          </ListItem>
          <ListItem>
            <TextField
              multiline
              variant='outlined'
              fullWidth
              name='comment'
              label='Enter comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='dark:text-white  dark:bg-gray-500'
            />
          </ListItem>
          <ListItem>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Submit
            </Button>
          </ListItem>
        </List>
      </form>
    </Fragment>
  );
};

export default CommentForm;
