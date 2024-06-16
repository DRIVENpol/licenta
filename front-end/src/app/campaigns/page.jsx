import React from 'react'
import CampaignRows from '../../../components/campaigns/CampaignRows'
import { Box } from '@chakra-ui/react'

const all_campaigns = () => {
  return (
    <>
      <Box bg='gray.800'>
        <CampaignRows />
      </Box>
    </>
  )
}

export default all_campaigns
