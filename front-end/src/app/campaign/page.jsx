import React from 'react'
import CampaignRows from '../../../components/campaigns/CampaignRows'
import { Box } from '@chakra-ui/react'

const all_campaigns = () => {
  return (
    <>
      <Box bg='grayAlpha.700'>
        <CampaignRows />
      </Box>
    </>
  )
}

export default all_campaigns
