import { TextField, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';

const SearchCollectionItemBar = () => {
  return (
    <TextField
      placeholder='Pretraži kolekciju...'
      sx={{ marginY: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Iconify
              icon='eva:search-fill'
              sx={{ ml: 1, color: 'text.disabled' }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchCollectionItemBar;
