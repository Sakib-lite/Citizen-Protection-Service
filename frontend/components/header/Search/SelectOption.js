import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//filter options for search component
export default function SelectOption() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size='small' className=''>
      <InputLabel id='demo-select-small'>
        <span className='text-xs '>Quick Access</span>
      </InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={value}
        label='value'
        onChange={handleChange}
        key='Confirmation Code'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
