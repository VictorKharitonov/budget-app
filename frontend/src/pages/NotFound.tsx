import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import cl from './scss/NotFound.module.scss';

const NotFound = () => {
  return (
    <Container>
      <Box className={cl.container}>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h5">The page you’re looking for doesn’t exist.</Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
