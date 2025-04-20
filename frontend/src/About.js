import { Box, Heading, Text, SimpleGrid, ScaleFade } from '@chakra-ui/react';
import ContactForm from './components/contact';

function About() {  
    return (
    <ScaleFade initialScale={0.9} in={true}>
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box 
        display="flex" 
        flexDirection="column"
        width={{ base: "100%", md: "55%" }}
        maxWidth={{ base: "100%", md: "55%" }} 
        rounded='lg' 
      >
        <Box marginTop='10px' marginBottom='5px'>
          <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
            About me
          </Heading>
          <Text>Hi, my name is Anyang. I am a second-year Computer Science student at the University of Adelaide, 
            deeply passionate about tech and continuously seeking to expand my knowledge and skills.</Text>
          <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
              Interests
          </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="15px" marginTop={3}>
                  <Box>
                    <Heading fontSize="15px" mb={5}>Web-Development:</Heading>
                    <Text>
                      I enjoy crafting interactive and responsive web applications. My projects often involve HTML, CSS, JavaScript, and frameworks like Chakra UI. I take pride in solving styling challenges to ensure seamless user experiences.
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="15px" mb={5}>Distributed Systems:</Heading>
                    <Text>
                      As a prospective major in Networking and Distributed Systems, I am interested by the use-cases of networked systems and how they can be optimized for performance and reliability.
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="15px" mb={5}>Testing and QA:</Heading>
                    <Text>
                      Using Flask and Selenium, I develop applications that automate data scraping and streamline web interactions.
                    </Text>
                  </Box>
              </SimpleGrid>
        </Box>     

        <ContactForm />
      </Box>
      </Box>
      </ScaleFade>
    );
}


export default About;
