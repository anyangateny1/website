import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, Text, Stack, SimpleGrid} from '@chakra-ui/react'

function About() {
    
    return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box 
        display="flex" 
        flexDirection="column"
        width={{ base: "100%", md: "66%" }}
        maxWidth={{ base: "100%", md: "66%" }} 
        rounded='lg' 
      >
        <Box marginTop='10px' marginBottom='5px'>
          <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
            About me
          </Heading>
          <Text>Hi, my name is Anyang Ateny. I am a second-year Computer Science student at the University of Adelaide, 
            deeply passionate about technology and continuously seeking to expand my knowledge and skills.</Text>
            <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
              Interests
          </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="15px" marginTop={3}>
                  <Box>
                    <Heading fontSize="15px" mb={3}>Web-Development:</Heading>
                    <Text>
                      I enjoy crafting interactive and responsive web applications. My projects often involve HTML, CSS, JavaScript, and frameworks like Bootstrap and Chakra UI. I take pride in solving intricate styling challenges to ensure seamless user experiences.
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="15px" mb={3}>Distributed Systems and Networking:</Heading>
                    <Text>
                      As a prospective major in Distributed Systems and Networking, I am fascinated by the complexities of networked systems and how they can be optimized for performance and reliability.
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="15px" mb={3}>Testing and QA:</Heading>
                    <Text>
                      Leveraging Flask and Selenium, I develop applications that automate data scraping and streamline web interactions.
                    </Text>
                  </Box>
              </SimpleGrid>
        </Box>     

        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center" 
        marginTop="10%"
        >
        <Heading fontSize='25px' marginBottom="10px" textAlign="center">Want to contact me?</Heading>
        <form style={{ width: '100%' }}> 
          <Stack spacing={4} width="100%" maxWidth="500px" margin="auto"> 
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="message" mb={4}>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="PLEASE HIRE ME PLEASE HIRE ME PLS PLEASE PLASE"/>
            </FormControl>
            <Button colorScheme="teal" width="full">Submit</Button>
          </Stack>
        </form>
      </Box>
      </Box>
    </Box>

    );
}


export default About;
