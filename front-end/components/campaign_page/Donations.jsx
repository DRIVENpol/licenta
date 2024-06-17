'use client'
import React from 'react';
import { Box, Heading, List, ListItem, Text, Flex } from '@chakra-ui/react';

const Donations = ({ donations }) => {
  return (
    <Box mb={5}>
      <Heading as="h3" size="lg" mb={4}>Donations</Heading>
      <List spacing={3} color='black'>
        {donations.map((donation, index) => (
          <ListItem key={index} p={4} bg="white" borderRadius="md" boxShadow="md">
            <Flex justify="space-between">
              <Text>{`Donor: ${donation.donor}`}</Text>
              <Text>{`${donation.amount} ETH`}</Text>
            </Flex>
            <Text color="gray.500" fontSize="sm">{new Date(donation.date).toLocaleString()}</Text>
            <br />
            <Text>Message: {`${donation.description}`}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Donations;
