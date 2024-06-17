'use client'
import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Center } from '@chakra-ui/react';
import CampaignCard from './CampaignCard';

const CampaignRows = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3001/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <Box p={5}>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id} 
              title={campaign.name}
              description={campaign.description}
              askAmount={campaign.askAmount}
              donated={campaign.donated} 
              imageLink={campaign.photo}
            />
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default CampaignRows;
