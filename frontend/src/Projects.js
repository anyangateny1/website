import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCode, FaHome, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProjectTiles from './components/projectTiles';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function Projects() {
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Hero Section */}
      <Box 
        bgGradient={useColorModeValue(
          'linear(to-br, purple.50, blue.50, pink.50)',
          'linear(to-br, gray.900, purple.900, blue.900)'
        )}
        py={24}
        position="relative"
        overflow="hidden"
        minH="50vh"
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <MotionVStack
            spacing={10}
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <Breadcrumb 
              spacing="8px" 
              separator={<Icon as={FaChevronRight} color="gray.500" />}
              fontSize="md"
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/" color={subtitleColor}>
                  <HStack spacing={2}>
                    <Icon as={FaHome} />
                    <Text>Home</Text>
                  </HStack>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color={textColor} fontWeight="bold">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Badge */}
            <Badge
              colorScheme="purple"
              variant="subtle"
              px={8}
              py={4}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              <Icon as={FaCode} mr={2} />
              My Projects
            </Badge>

            {/* Title */}
            <Heading 
              as="h1" 
              size="3xl" 
              color={textColor} 
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Featured Work
            </Heading>

            {/* Subtitle */}
            <Text 
              color={subtitleColor} 
              fontSize="xl" 
              maxW="3xl"
              fontWeight="medium"
            >
              A collection of projects that showcase my skills and passion for development
            </Text>
          </MotionVStack>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Box py={24}>
        <Container maxW="container.xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProjectTiles />
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

export default Projects;
