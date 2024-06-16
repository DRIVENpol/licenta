'use client'
import React from 'react';
import { Box, Text, Progress, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import HeroBanner from '../../../../../components/campaign_page/HeroBanner';
import Donations from '../../../../../components/campaign_page/Donations';
import Transfers from '../../../../../components/campaign_page/Transfers';

const CampaignPage = () => {
  // Dummy data
  const campaign = {
    title: "Help Build a School",
    description: "We are raising funds to build a new school in our community. Your contribution will help provide better education for children.",
    imageUrl: "https://via.placeholder.com/300",
    askAmount: 10000,
    donatedAmount: 5000,
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    },
    donations: [
      { donor: "0x1234...abcd", amount: 1.0, date: "2024-06-16 12:00:00" },
      { donor: "0x5678...efgh", amount: 0.5, date: "2024-06-15 14:30:00" }
    ],
    withdrawals: [
      { recipient: "0xabcd...1234", amount: 0.3, date: "2024-06-15 18:00:00" },
      { recipient: "0xefgh...5678", amount: 0.2, date: "2024-06-14 10:00:00" }
    ]
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      p={5}
      bg='gray.800'
      color='white'
    >
      <HeroBanner campaign={campaign} />
      <Box mb={5}>
        <Text fontSize="2xl" fontWeight="bold">${campaign.donatedAmount} raised of ${campaign.askAmount}</Text>
        <Progress value={(campaign.donatedAmount / campaign.askAmount) * 100} size="lg" colorScheme="teal" mt={2} />
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
            <Donations donations={campaign.donations} />
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
