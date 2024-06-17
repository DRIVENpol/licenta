'use client'
import React, { useState } from 'react';
import { Box, Image, Text, Link, Flex, Icon, VStack, Heading, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, useToast } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const HeroBanner = ({ campaign, refreshDonations }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleDonate = async () => {
    if (!amount || !description) {
      toast({
        title: 'Validation error.',
        description: 'Amount and description are required.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/campaigns/${campaign.id}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor: '0x1234...abcd',
          amount: Number(amount), 
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: 'Donation successful.',
        description: `Thank you for donating ${amount} ETH.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setAmount('');
      setDescription('');
      onClose();
      refreshDonations();
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to process the donation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      p={5}
      borderRadius="md"
      boxShadow="md"
      color='white'
      bg="gray.700"
    >
      <Image
        src={campaign.photo}
        alt="Campaign Image"
        boxSize="300px"
        objectFit="cover"
        borderRadius="md"
        mb={{ base: 4, md: 0 }}
      />
      <VStack align="flex-start" ml={{ base: 0, md: 5 }} spacing={4} w="full">
        <Heading as="h2" size="xl">{campaign.name}</Heading>
        <Text fontSize="lg">{campaign.description}</Text>
        <Flex mt={4}>
          <Link href={campaign.socialLinks.twitter} isExternal mx={2}>
            <Icon as={FaTwitter} boxSize={6} color="blue.500" />
          </Link>
          <Link href={campaign.socialLinks.facebook} isExternal mx={2}>
            <Icon as={FaFacebook} boxSize={6} color="blue.800" />
          </Link>
          <Link href={campaign.socialLinks.instagram} isExternal mx={2}>
            <Icon as={FaInstagram} boxSize={6} color="pink.400" />
          </Link>
        </Flex>
        <Button colorScheme="teal" size="lg" mt={4} onClick={onOpen}>Donate</Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Donate to {campaign.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              mb={4}
            />
            <Textarea
              placeholder="Message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleDonate}>
              Donate
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HeroBanner;
