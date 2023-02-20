import React, { useState } from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';

import { capitalCase } from 'change-case';
import { Container, Tabs, Typography, Tab, Box } from '@mui/material';

import InComingFriendRequests from '../features/friend/InComingFriendRequests';
import OutGoingFriendRequests from '../features/friend/OutGoingFriendRequests';

function RequestsPage() {
  const [currentTab, setcurrentTab] = useState("incoming_friend_requests");
  
  const ACCOUNT_TABS = [
    {
      value: "incoming_friend_requests",
      icon: <InputIcon sx={{ fontSize: 30 }}/>,
      component: <InComingFriendRequests />
    },
    {
      value: "outgoing_friend_requests",
      icon: <OutputIcon sx={{ fontSize: 30 }}/>,
      component: <OutGoingFriendRequests/>
    },

  ]

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
         Friend Requests
      </Typography>

      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant='scrollable'
        allowScrollButtonsMobile
        onChange={(e, value) => setcurrentTab(value)}
      >
        {ACCOUNT_TABS.map((tab) =>  (
        <Tab
          disableRipple
          key={tab.value}
          label={capitalCase(tab.value)}
          icon={tab.icon}
          value={tab.value}
        />
        ))}
      </Tabs>

      <Box sx={{ mb: 5}}/>

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>
      })}
    </Container>
  )
}

export default RequestsPage;