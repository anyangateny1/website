import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  useColorModeValue, 
  Flex, 
  Spacer, 
  IconButton, 
  useColorMode,
  Container,
  Text,
  HStack,
  Divider
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import Homepage from './Homepage';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import './index.css';
import { trackPageView, trackExternalLinkClick } from './utils/analytics';

function Navigation() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Container maxW="container.xl" py={4}>
        <Flex align="center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color={textColor}
              _hover={{ color: 'blue.500' }}
              transition="color 0.2s"
            >
              Anyang Ateny
            </Text>
          </Link>
          
          <Spacer />
          
          <HStack spacing={6}>
            <HStack spacing={4}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button 
                  variant={isActive('/') ? 'solid' : 'ghost'}
                  colorScheme={isActive('/') ? 'blue' : 'gray'}
                  size="sm"
                  fontWeight="medium"
                  _hover={{ transform: 'translateY(-1px)' }}
                  transition="all 0.2s"
                >
                  Home
                </Button>
              </Link>
              <Link to="/projects" style={{ textDecoration: 'none' }}>
                <Button 
                  variant={isActive('/projects') ? 'solid' : 'ghost'}
                  colorScheme={isActive('/projects') ? 'blue' : 'gray'}
                  size="sm"
                  fontWeight="medium"
                  _hover={{ transform: 'translateY(-1px)' }}
                  transition="all 0.2s"
                >
                  Projects
                </Button>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <Button 
                  variant={isActive('/about') ? 'solid' : 'ghost'}
                  colorScheme={isActive('/about') ? 'blue' : 'gray'}
                  size="sm"
                  fontWeight="medium"
                  _hover={{ transform: 'translateY(-1px)' }}
                  transition="all 0.2s"
                >
                  About
                </Button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button 
                  variant={isActive('/contact') ? 'solid' : 'ghost'}
                  colorScheme={isActive('/contact') ? 'blue' : 'gray'}
                  size="sm"
                  fontWeight="medium"
                  _hover={{ transform: 'translateY(-1px)' }}
                  transition="all 0.2s"
                >
                  Contact
                </Button>
              </Link>
            </HStack>
            
            <Divider orientation="vertical" height="20px" />
            
            <HStack spacing={2}>
              <IconButton
                as="a"
                href="https://github.com/anyangateny1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                icon={<BsGithub />}
                size="sm"
                variant="ghost"
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                onClick={() => trackExternalLinkClick('github', 'https://github.com/anyangateny1')}
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/anyangateny1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                icon={<BsLinkedin />}
                size="sm"
                variant="ghost"
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                onClick={() => trackExternalLinkClick('linkedin', 'https://www.linkedin.com/in/anyangateny1/')}
              />
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                size="sm"
                variant="ghost"
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s"
              />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Router>
      <Box 
        minHeight="100vh" 
        bg={bgColor}
        display="flex"
        flexDirection="column"
      >
        <Navigation />
        
        <Box flex="1" pt="80px">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
