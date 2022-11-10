import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { unsetShowModal } from '../store/ui-slice';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import ComplaintForm from '../Form/ComplaintForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function LocationModal() {
  const open = useSelector((state) => state.ui.showModal);
  const dispatch = useDispatch();


  const handleClose = () => dispatch(unsetShowModal());

  return (
    <div>
      <Modal
        open={open}
        onClose={!open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='bg-transparent'
      >
        <Box sx={style} className='relative w-8/12 rounded-lg bg-transparent'>
    <ComplaintForm/>
        </Box>
      </Modal>
    </div>
  );
}
