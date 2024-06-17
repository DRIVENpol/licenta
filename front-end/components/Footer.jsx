'use client'
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      py={4}
      bg={'black'}
      color="white"
      textAlign="center"
    >
      <Text>© 2024 cDonor. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
