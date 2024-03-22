import React from 'react'
import {Container,Box,Text,Tabs,Tab,TabList,TabPanel,TabPanels} from "@chakra-ui/react"
import Login from "../Component/Authentication/Login";
import Signup from "../Component/Authentication/Signup";

const HomePage = () => {
 
  return (
    <Container maxW="xl" centerContent >
    <Box display="flex" justifyContent="center" p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
      <Text fontSize="4xl" fontFamily="Work sans">
        PDF SHARE APP
      </Text>
    </Box>
    
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
    <Tabs variant='soft-rounded' colorScheme='red' text="black">
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">SignUp</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
   
    </Container>
  )
}

export default HomePage
