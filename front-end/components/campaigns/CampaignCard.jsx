'use client'
import React from 'react';
import { Box, Image, Text, Progress, Button, Stack, Center, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const CampaignCard = ({ id, title, description, askAmount, donated, imageLink }) => {
  const router = useRouter();

  const handleDonateClick = () => {
    router.push(`/campaigns/campaign/${id}`);
  };

  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.700"
      boxShadow="md"
      color='white'
      p={5}
      m={5}
    >
      <Center>
        <VStack>
          <Image src={imageLink || "https://via.placeholder.com/300"} alt="Campaign Image" />

          <Box p={6}>
            <Box d="flex" alignItems="baseline">
              <Text fontSize="xl" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
                {title}
              </Text>
            </Box>

            <Box mt={2}>
              <Text fontSize="md" color="gray.200">
                {description}
              </Text>
            </Box>

            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                ${donated > 0 ? donated : "0"} raised of ${askAmount}
              </Text>
              <Progress value={(donated / askAmount) * 100} size="sm" colorScheme="teal" mt={2} />
            </Box>

            <Stack direction="row" spacing={4} align="center" mt={4}>
              <Button colorScheme="teal" variant="solid" onClick={handleDonateClick}>
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
