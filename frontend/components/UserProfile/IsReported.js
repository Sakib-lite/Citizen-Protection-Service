import React,{Fragment} from "react"
import TableCell from '@mui/material/TableCell';
const IsReported = ({user}) => {
      
    const reported=user.comments.find((com)=>com.reported===true)
      
  return (
    <Fragment>
          <TableCell align='center'>
             {reported ? 'True':'False'             }
                </TableCell>
    </Fragment>
  )
};

export default IsReported;
