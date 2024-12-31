
import React from 'react';
import { Box, Container } from '@chakra-ui/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container height='full' maxH={'lg'} maxW="full" overflowY={'auto'}>
    <Box>{children}</Box>
  </Container>
);
