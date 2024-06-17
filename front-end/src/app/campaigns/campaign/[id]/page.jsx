'use client'
import React, { useEffect, useState } from 'react';
import { Box, Text, Progress, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import HeroBanner from '../../../../../components/campaign_page/HeroBanner';
import Donations from '../../../../../components/campaign_page/Donations';
import Transfers from '../../../../../components/campaign_page/Transfers';
import { useParams } from 'next/navigation';

const CampaignPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:3001/campaigns/${id}`);
        const data = await response.json();
        setCampaign(data);
        setDonations(data.donations);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [id]);

  const refreshDonations = async () => {
    try {
      const response = await fetch(`http://localhost:3001/campaigns/${id}/donations`);
      const data = await response.json();
      setDonations(data);
      const updatedCampaignResponse = await fetch(`http://localhost:3001/campaigns/${id}`);
      const updatedCampaign = await updatedCampaignResponse.json();
      setCampaign(updatedCampaign);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  if (!campaign) return <Text>Loading...</Text>;

  return (
    <Flex
      direction="column"
      minH="100vh"
      p={5}
      bg='gray.800'
      color='white'
    >
      <HeroBanner campaign={campaign} refreshDonations={refreshDonations} />
      <Box mb={5}>
        <Text fontSize="2xl" fontWeight="bold">${campaign.donated} raised of ${campaign.askAmount}</Text>
        <Progress value={(campaign.donated / campaign.askAmount) * 100} size="lg" colorScheme="teal" mt={2} />
      </Box>
      <Tabs variant="soft-rounded" colorScheme="teal" mt={5}>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'teal.500' }} _hover={{ bg: 'teal.400' }}>Donations</Tab>
          <Tab _selected={{ color: 'white', bg: 'teal.500' }} _hover={{ bg: 'teal.400' }}>Withdrawals</Tab>
        </TabList>
        <br />
        <TabPanels>
          <TabPanel
            p={5}
            bg="gray.700"
            borderRadius="md"
            boxShadow="lg"
          >
            <Donations donations={donations} />
          </TabPanel>
          <TabPanel
            p={5}
            bg="gray.700"
            borderRadius="md"
            boxShadow="lg"
          >
            <Transfers withdrawals={campaign.withdrawals} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default CampaignPage;
