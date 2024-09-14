import { Box, Image, Link, IconButton, Heading, Stack, Button, ScaleFade} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { BioSection, BioYear } from './components/sections'
import { SmallTiles }  from './components/projectTiles'
import { Link as RouterLink } from 'react-router-dom';


function Homepage() {
  return (
    <ScaleFade initialScale={0.9} in={true}>
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Box 
        width={{ base: "100%", md: "55%" }}
        maxWidth={{ base: "100%", md: "55%" }} 
        rounded='lg' 
        bg='white'
      >
        <Box display={{ md: 'flex' }} >
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Anyang Ateny
            </Heading>
            <Stack mt={4} spacing={4} direction='row' align='center'>
              <Link href="/files/Anyang Intern FINAL.pdf" target="_blank">
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
      </Box>
    </Box>
    </ScaleFade>
  );
}

export default Homepage;
