import React, { Fragment } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { COMMENT_UPDATE } from '../../utils/schema';
import { useMutation } from '@apollo/client';
import Snackbar from '../../utils/notistick/Snackbar';

const ReportComment = ({ id }) => {
  const [commentUpdate, { data, error, loading }] = useMutation(COMMENT_UPDATE);

  const reportHandler = () => {
    commentUpdate({
      variables: {
        commentUpdateId: id,
        input: { reported: true, visible: false },
      },
    });
    Snackbar.success("Comment Reported")
  };

  return (
    <Fragment>
      <Tooltip title='Report to Admin'>
        <IconButton onClick={reportHandler}>
          <FlagIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default ReportComment;
