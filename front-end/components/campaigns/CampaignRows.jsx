'use client'
import React from 'react';
import { Box, SimpleGrid, Center } from '@chakra-ui/react';
import CampaignCard from './CampaignCard'; 

const CampaignRows = () => {
  const campaignCards = new Array(10).fill(null);

  return (
    <Box p={5}>
        <Center>
      <SimpleGrid columns={["1", "2", "3", "4", "5",]} spacing={5}>
        {campaignCards.map((_, index) => (
          <CampaignCard key={index} />
        ))}
      </SimpleGrid>
      </Center>
    </Box>
  );
};

export default CampaignRows;
