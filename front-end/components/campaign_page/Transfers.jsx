'use client'
import React, { useState } from 'react';
import { Box, Heading, List, ListItem, Text, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, useDisclosure, useToast } from '@chakra-ui/react';

const Transfers = ({ withdrawals, isCreator, refreshWithdrawals, campaignId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleWithdraw = async () => {
    if (!recipient || !amount || !description) {
      toast({
        title: 'Validation error.',
        description: 'Recipient, amount, and description are required.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/campaigns/${campaignId}/withdrawals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient,
          amount: Number(amount), 
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: 'Withdrawal successful.',
        description: `You have successfully withdrawn ${amount} ETH.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setRecipient('');
      setAmount('');
      setDescription('');
      onClose();
      refreshWithdrawals(); 
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to process the withdrawal.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mb={5}>
      <Heading as="h3" size="lg" mb={4}>Withdrawals</Heading>
      {/* {isCreator && ( */}
      {!isCreator && (
        <>
          <Button colorScheme="teal" mb={4} onClick={onOpen}>Withdraw</Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Withdraw Funds</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Recipient Address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  mb={4}
                />
                <Input
                  placeholder="Amount in ETH"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  mb={4}
                />
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={handleWithdraw}>
                  Withdraw
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      <List spacing={3} color='black'>
        {withdrawals.map((withdrawal, index) => (
          <ListItem key={index} p={4} bg="white" borderRadius="md" boxShadow="md">
            <Flex justify="space-between">
              <Text>{`Recipient: ${withdrawal.recipient}`}</Text>
              <Text>{`${withdrawal.amount} ETH`}</Text>
            </Flex>
            <Text color="gray.500" fontSize="sm">{new Date(withdrawal.date).toLocaleString()}</Text>
            <Text color="gray.500" fontSize="sm">{`Description: ${withdrawal.description}`}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Transfers;
