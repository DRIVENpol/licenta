'use client'
import React from 'react';
import { Box, Heading, List, ListItem, Text, Flex } from '@chakra-ui/react';

const Transfers = ({ withdrawals }) => {
  return (
    <Box mb={5}>
      <Heading as="h3" size="lg" mb={4}>Withdrawals</Heading>
      <List spacing={3}>
        {withdrawals.map((withdrawal, index) => (
          <ListItem key={index} p={4} bg="white" borderRadius="md" boxShadow="md">
            <Flex justify="space-between">
              <Text>{`Recipient: ${withdrawal.recipient}`}</Text>
              <Text>{`${withdrawal.amount} ETH`}</Text>
            </Flex>
            <Text color="gray.500" fontSize="sm">{new Date(withdrawal.date).toLocaleString()}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Transfers;
