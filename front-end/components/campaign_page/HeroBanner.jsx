'use client'
import React from 'react';
import { Box, Image, Text, Link, Flex, Icon, VStack, Heading, Button } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const HeroBanner = ({ campaign }) => {
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
        src={campaign.imageUrl}
        alt="Campaign Image"
        boxSize="300px"
        objectFit="cover"
        borderRadius="md"
        mb={{ base: 4, md: 0 }}
      />
      <VStack align="flex-start" ml={{ base: 0, md: 5 }} spacing={4} w="full">
        <Heading as="h2" size="xl">{campaign.title}</Heading>
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
        <Button colorScheme="teal" size="lg" mt={4}>Donate</Button>
      </VStack>
    </Flex>
  );
};

export default HeroBanner;
