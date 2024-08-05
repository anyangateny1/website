import { Box, Image, Link, IconButton, Heading, Stack, Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { BioSection, BioYear } from './components/sections'
import { SmallTiles }  from './components/projectTiles'
import { Link as RouterLink } from 'react-router-dom';


function Homepage() {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Box 
        width={{ base: "100%", md: "66%" }}
        maxWidth={{ base: "100%", md: "66%" }} 
        rounded='lg' 
        bg='white'
      >
        <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={10}
        marginTop={10}>
        <Image src='https://f4.bcbits.com/img/a0822881135_10.jpg' boxSize={{base: "90%", md: "40%"}}/>
        </Box>
        <Box display={{ md: 'flex' }} >
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Anyang Ateny
            </Heading>
            <Stack mt={4} spacing={4} direction='row' align='center'>
              <Link href="/files/Anyang Ateny Resume.pdf" target="_blank">
                <Button rightIcon={<ChevronRightIcon />} colorScheme='teal' size='md' variant='solid'>
                  Résumé / CV
                </Button>
              </Link>
              <Link href="https://github.com/anyangateny1" target="_blank">
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='github'
                  fontSize='20px'
                  icon={<BsGithub />}
                />
              </Link>
              <Link href="https://www.linkedin.com/in/anyangateny1/" target="_blank">
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='linkedin'
                  fontSize='20px'
                  icon={<BsLinkedin />}
                />
              </Link>
            </Stack>
          </Box>   
        </Box>

        <Box marginTop='10px' marginBottom='5px'>
          <p>
            Hi, I'm Anyang, a penultimate year Computer Science student at the University of Adelaide. 
            I have a keen interest in embedded systems and systems programming, 
            particularly using C and C++.
          </p>
        </Box>

        

        <Box marginTop='10px' marginBottom='5px'>
          <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
            I'm interested in...
          </Heading>
          <BioSection>
            <BioYear>Frontend:</BioYear>
            react, flask, vue
          </BioSection>
          <BioSection>
            <BioYear>Backend:</BioYear>
            java, node, express
          </BioSection>
          <BioSection>
            <BioYear>Embedded:</BioYear>
            c++, chip8
          </BioSection>
        </Box>

        <Box marginTop='10px' marginBottom='5px' display="flex" flexDirection="column">
          <Heading fontSize='25px' marginTop='10px'>
            Things I'm proud of!
          </Heading>
          <Box marginTop='10px' marginBottom='10px'>
            <SmallTiles></SmallTiles>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" marginTop='10px'>
            <RouterLink to='/projects'>
              <Button rightIcon={<ChevronRightIcon />} colorScheme='teal' size='md' variant='solid'>
                View all projects
              </Button>
            </RouterLink>
          </Box>
        </Box>

        <Box marginTop='10px' marginBottom='5px'>
          <Heading fontSize='25px' marginTop='10px' marginBottom='5px'>
            Blog
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}

export default Homepage;
