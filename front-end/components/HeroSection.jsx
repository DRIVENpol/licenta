'use client'
import React from 'react';
import { Box, Text, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
const HeroSection = () => {
  const router = useRouter();

  const handleCreateCampaign = () => {
    router.push('/create-campaign');
  };

  const handleExploreCampaigns = () => {
    router.push('/campaigns');
  };

  return (
    <Box
      position="relative"
      h="100vh"
      w="100%"
      bgImage="url('https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="black"
        opacity="0.6"
      />
      <Box
        position="relative"
        zIndex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
        h="100%"
        px={4}
      >
        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">
          Welcome to cDonor app!
        </Text>
        <Text fontSize={{ base: 'md', md: 'xl' }} mt={4} mb={8}>
          The first crypto donations app. Built on Ethereum using EVM compatible smart contracts!
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Button colorScheme="teal" variant="solid" size="lg" onClick={handleCreateCampaign}>
            Create a campaign
          </Button>
          <Button colorScheme="white" variant="outline" size="lg" onClick={handleExploreCampaigns}>
            Explore campaigns
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;
