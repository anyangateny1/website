import React, { useEffect } from 'react';
import { 
  SimpleGrid, 
  Box, 
  Text, 
  Heading, 
  Badge, 
  Card, 
  CardBody, 
  VStack, 
  HStack,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useProjects from '../hooks/useProjects';
import ProjectImage from './ProjectImage';
import { FaCode } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

const MotionCard = motion(Card);

const parseTags = ({ tags }) => {
  return (
    <HStack spacing={2} flexWrap="wrap" justify="center">
      {tags.map((tag, index) => 
        tag ? (
          <Badge 
            key={index} 
            colorScheme="blue" 
            variant="subtle"
            fontSize="xs" 
            px={2} 
            py={1}
            borderRadius="md"
          >
            {tag.toUpperCase()}
          </Badge>
        ) : null
      )}
    </HStack>
  );
};

const ProjectTiles = () => {
  const { projects, error, loading } = useProjects();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {[1, 2, 3].map((index) => (
          <Card key={index} bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="3xl" h="full">
            <CardBody p={0}>
              <VStack spacing={0} align="stretch" h="full">
                <Skeleton height="250px" borderTopRadius="3xl" />
                <VStack spacing={6} p={8} align="stretch" flex={1}>
                  <VStack spacing={3} align="stretch">
                    <Skeleton height="24px" width="70%" />
                    <Skeleton height="20px" width="50%" />
                  </VStack>
                  <SkeletonText mt={2} noOfLines={4} spacing={2} flex={1} />
                  <VStack spacing={3} align="stretch">
                    <Skeleton height="16px" width="40%" />
                    <HStack spacing={2}>
                      <Skeleton height="24px" width="60px" borderRadius="full" />
                      <Skeleton height="24px" width="80px" borderRadius="full" />
                      <Skeleton height="24px" width="70px" borderRadius="full" />
                    </HStack>
                  </VStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {projects.map((project, index) => (
        <MotionCard
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="3xl"
          _hover={{ 
            transform: 'translateY(-12px)', 
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            borderColor: 'purple.300',
            transition: 'all 0.3s'
          }}
          overflow="hidden"
          h="full"
        >
          <CardBody p={0}>
            <VStack spacing={0} align="stretch" h="full">
              <Box position="relative" overflow="hidden">
                <ProjectImage
                  imageUrl={project.imgUrl}
                  alt={project.projectName}
                  size="medium"
                />
                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  bg="rgba(255,255,255,0.9)"
                  backdropFilter="blur(10px)"
                  borderRadius="full"
                  p={3}
                >
                  <Icon as={FaCode} color="purple.500" boxSize={5} />
                </Box>
              </Box>
              
              <VStack spacing={6} p={8} align="stretch" flex={1}>
                <VStack spacing={3} align="stretch">
                  <Heading 
                    as="h3" 
                    size="lg" 
                    color={textColor}
                    fontWeight="bold"
                  >
                    {project.projectName}
                  </Heading>
                  <Text 
                    fontSize="md" 
                    color="purple.500"
                    fontWeight="semibold"
                  >
                    {project.projectDate || project.date}
                  </Text>
                </VStack>
                
                <Text 
                  color={subtitleColor} 
                  fontSize="md"
                  lineHeight="tall"
                  noOfLines={4}
                  flex={1}
                >
                  {project.desc || project.description}
                </Text>
                
                {project.tags && project.tags.length > 0 && (
                  <Box>
                    <Text color={textColor} fontSize="sm" fontWeight="semibold" mb={3}>
                      Technologies:
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      {project.tags.map((tag, tagIndex) => 
                        tag ? (
                          <Badge 
                            key={tagIndex} 
                            colorScheme="purple" 
                            variant="subtle"
                            fontSize="xs" 
                            px={3} 
                            py={1}
                            borderRadius="full"
                            fontWeight="medium"
                          >
                            {tag.toUpperCase()}
                          </Badge>
                        ) : null
                      )}
                    </HStack>
                  </Box>
                )}
              </VStack>
            </VStack>
          </CardBody>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};

const SmallTiles = () => {
  const { projects, error, loading, fetchProjects } = useProjects();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
        {[1, 2].map((index) => (
          <Card key={index} bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="2xl" h="full">
            <CardBody p={0}>
              <VStack spacing={0} align="stretch" h="full">
                <Skeleton height="180px" borderTopRadius="2xl" />
                <VStack spacing={4} p={6} align="stretch">
                  <VStack spacing={2} align="stretch">
                    <Skeleton height="20px" width="70%" />
                    <Skeleton height="16px" width="50%" />
                  </VStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="xl">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
      {projects.slice(0, 2).map((project, index) => (
        <MotionCard
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          _hover={{ 
            transform: 'translateY(-8px)', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            borderColor: 'purple.300',
            transition: 'all 0.3s'
          }}
          overflow="hidden"
          h="full"
        >
          <CardBody p={0}>
            <VStack spacing={0} align="stretch" h="full">
              <Box position="relative" overflow="hidden">
                <ProjectImage
                  imageUrl={project.imgUrl}
                  alt={project.projectName}
                  size="small"
                />
                <Box
                  position="absolute"
                  top={3}
                  right={3}
                  bg="rgba(255,255,255,0.9)"
                  backdropFilter="blur(10px)"
                  borderRadius="full"
                  p={2}
                >
                  <Icon as={FaCode} color="purple.500" boxSize={4} />
                </Box>
              </Box>
              
              <VStack spacing={3} p={6} align="stretch" flex={1}>
                <Heading 
                  as="h4" 
                  size="md" 
                  color={textColor}
                  fontWeight="bold"
                >
                  {project.projectName}
                </Heading>
                <Text 
                  fontSize="sm" 
                  color="purple.500"
                  fontWeight="semibold"
                >
                  {project.projectDate || project.date}
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};

export default ProjectTiles;
export { SmallTiles };
