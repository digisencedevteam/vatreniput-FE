import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import collectionImage from 'src/assets/illustrations/sittingIllustration.png';

const CollectionStatisticIllustration = ({ ...other }: BoxProps) => {
  return (
    <Box
      component="div"
      width="100%"
      height="100%"
      position="relative"
      {...other}
    >
      <img
        alt="Collection Illustration"
        src={collectionImage}
        width="100px"
        height="100px"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
    </Box>
  );
}

export default memo(CollectionStatisticIllustration);
