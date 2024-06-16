'use client'
import React from 'react';
import { Box, Image, Text, Progress, Button, Stack, Center, VStack } from '@chakra-ui/react';

const CampaignCard = () => {
  const title = "Help Build a School";
  const description = "We are raising funds to build a new school in our community. Your contribution will help provide better education for children.";
  const amountNeeded = 10000;
  const amountDonated = 5000;
//   const imageLink = "https://unsplash.com/photos/man-in-black-jacket-and-blue-denim-jeans-standing-beside-brown-wooden-box-trailer-during-daytime-BErJJL_KsjA"

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      color='black'
      p={5}
      m={5}
    >
    <Center>
        <VStack>
      <Image src="https://via.placeholder.com/300" alt="Dummy Image" />

      <Box p={6}>
        <Box d="flex" alignItems="baseline">
          <Text fontSize="xl" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Text>
        </Box>

        <Box mt={2}>
          <Text fontSize="md" color="gray.600">
            {description}
          </Text>
        </Box>

        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            ${amountDonated} raised of ${amountNeeded}
          </Text>
          <Progress value={(amountDonated / amountNeeded) * 100} size="sm" colorScheme="teal" mt={2} />
        </Box>

        <Stack direction="row" spacing={4} align="center" mt={4}>
          <Button colorScheme="teal" variant="solid">
            Donate
          </Button>
        </Stack>
      </Box>
      </VStack>
      </Center>
    </Box>
  );
};

export default CampaignCard;