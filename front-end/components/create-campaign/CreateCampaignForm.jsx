'use client'
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, VStack, HStack, useToast } from '@chakra-ui/react';

const CreateCampaignForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    beneficiaryAddress: '',
    askAmount: '',
    name: '',
    description: '',
    photo: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Campaign created.',
          description: `Campaign ${result.name} has been created successfully.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          id: '',
          beneficiaryAddress: '',
          askAmount: '',
          name: '',
          description: '',
          photo: '',
          twitter: '',
          facebook: '',
          instagram: ''
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'An error occurred.',
          description: errorData.message || 'Unable to create campaign.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create campaign.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} bg="gray.800" color="white" borderRadius="md" boxShadow="md" minH='calc(100vh)'>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="id" isRequired>
            <FormLabel>Campaign ID</FormLabel>
            <Input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="beneficiaryAddress" isRequired>
            <FormLabel>Beneficiary Address</FormLabel>
            <Input
              type="text"
              name="beneficiaryAddress"
              value={formData.beneficiaryAddress}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="askAmount" isRequired>
            <FormLabel>Ask Amount</FormLabel>
            <Input
              type="number"
              name="askAmount"
              value={formData.askAmount}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Campaign Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Campaign Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="photo" isRequired>
            <FormLabel>Photo URL</FormLabel>
            <Input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="twitter">
            <FormLabel>Twitter</FormLabel>
            <Input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="facebook">
            <FormLabel>Facebook</FormLabel>
            <Input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <FormControl id="instagram">
            <FormLabel>Instagram</FormLabel>
            <Input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />
          </FormControl>
          <Button colorScheme="teal" size="lg" type="submit">
            Create Campaign
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateCampaignForm;
