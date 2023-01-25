import React, { Fragment, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../utils/styles';
import { useRouter } from 'next/router';


export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search?name=${search}`);  
    }
  };

  return (
    <Fragment>
      <Search className='mx-auto dark:bg-gray-700 bg-gray-400 ml-auto'>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </Search>
    </Fragment>
  );
}
