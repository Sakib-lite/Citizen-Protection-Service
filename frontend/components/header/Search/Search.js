import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SelectOption from './SelectOption';

export default function Search() {
  return (
    <div className='flex items-center'>
      <SelectOption />

      <div className='flex'>
        <Box
          sx={{
            width: 200,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            id='fullWidth'
            size='small'
            placeholder='search love questions...'
          />
        </Box>
        <button className='border-2 px-2 md:px-4 py-1'>
          {' '}
          <SearchOutlinedIcon className='text-gray-700' />
        </button>
      </div>
    </div>
  );
}
