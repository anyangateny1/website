import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Circle,
  Avatar,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaHome, 
  FaChevronRight, 
  FaLightbulb,
  FaCode,
  FaDatabase,
  FaCloud,
  FaMobile
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionCard = motion(Card);

function About() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const expertiseAreas = [
    {
      icon: FaCode,
      title: "Frontend Development",
      description: "Vue.js, TypeScript, JavaScript, React",
      color: "blue.500",
      gradient: "linear(to-r, blue.400, cyan.500)"
    },
    {
      icon: FaDatabase,
      title: "Backend Development", 
      description: "Python, Java, Spring Boot",
      color: "green.500",
      gradient: "linear(to-r, green.400, teal.500)"
    },
    {
      icon: FaCloud,
      title: "DevOps & Cloud",
      description: "AWS, Docker, Git",
      color: "orange.500",
      gradient: "linear(to-r, orange.400, red.500)"
    },
    {
      icon: FaMobile,
      title: "Systems Programming",
      description: "C++, Python, Low-level programming",
      color: "purple.500",
      gradient: "linear(to-r, purple.400, pink.500)"
    }
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Hero Section */}
      <Box 
        bgGradient={useColorModeValue(
          'linear(to-br, blue.50, purple.50, pink.50)',
          'linear(to-br, gray.900, purple.900, blue.900)'
        )}
        py={24}
        position="relative"
        overflow="hidden"
        minH="60vh"
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
                  About
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Badge */}
            <Badge
              colorScheme="blue"
              variant="subtle"
              px={8}
              py={4}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              <Icon as={FaUser} mr={2} />
              About Me
            </Badge>

            {/* Profile Section */}
            <VStack spacing={8}>
              <Avatar
                size="2xl"
                name="Anyang Ateny"
                bg="linear(to-r, blue.500, purple.600)"
                color="white"
                fontSize="3xl"
                boxShadow="0 0 40px rgba(66, 153, 225, 0.4)"
                border="4px solid"
                borderColor="white"
                _dark={{ borderColor: "gray.700" }}
              />
              
              <Heading 
                as="h1" 
                size="3xl" 
                color={textColor}
                textAlign="center"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Anyang Ateny
              </Heading>

              <Text 
                fontSize="xl" 
                color={subtitleColor}
                textAlign="center"
                maxW="3xl"
                lineHeight="tall"
                fontWeight="medium"
              >
                Computer Science Student passionate about learning and building 
                innovative solutions through hands-on projects and exploration
              </Text>
            </VStack>
          </MotionVStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={24}>
        <Container maxW="container.xl">
          <VStack spacing={20}>
            {/* About Me Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              w="full"
            >
              <Card bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="3xl" boxShadow="0 10px 30px rgba(0,0,0,0.1)">
                <CardBody p={10}>
                  <VStack spacing={8} align="stretch">
                    <HStack spacing={4}>
                      <Circle size="60px" bg="blue.500" color="white">
                        <Icon as={FaUser} boxSize={7} />
                      </Circle>
                      <Heading as="h2" size="xl" color={textColor} fontWeight="bold">
                        About Me
                      </Heading>
                    </HStack>
                    <Divider />
                    <Text color={subtitleColor} fontSize="lg" lineHeight="tall" fontWeight="medium">
I'm a university student passionate about all aspects of software development. Whether it's designing intuitive frontends, building strong backend APIs, navigating cloud infrastructure, or diving deep into low-level systems programming with C++. 
                    </Text>
                    <Text color={subtitleColor} fontSize="lg" lineHeight="tall" fontWeight="medium">
                      I'm primarily interested in low-level and systems based programming. I have a keen interest and experience in using C++ and Python to solve implement solutions to difficult problems.
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </MotionBox>

            {/* Areas of Expertise */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              w="full"
            >
              <VStack spacing={12}>
                <VStack spacing={6} textAlign="center">
                  <Badge
                    colorScheme="purple"
                    variant="subtle"
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontSize="md"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    <Icon as={FaLightbulb} mr={2} />
                    Expertise
                  </Badge>
                  <Heading as="h2" size="2xl" color={textColor} fontWeight="extrabold" letterSpacing="tight">
                    Areas of Expertise
                  </Heading>
                  <Text color={subtitleColor} fontSize="xl" maxW="2xl" fontWeight="medium">
Technologies I'm learning and applying in my personal projects and work experience
                  </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                  {expertiseAreas.map((area, index) => (
                    <MotionCard
                      key={area.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -12,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      bg={bgColor}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="3xl"
                      overflow="hidden"
                      _hover={{ 
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        borderColor: area.color,
                      }}
                      h="full"
                    >
                      <Box
                        h="5px"
                        bgGradient={area.gradient}
                        w="full"
                      />
                      <CardBody p={8} h="full">
                        <HStack spacing={6} align="start" h="full">
                          <Circle
                            size="70px"
                            bgGradient={area.gradient}
                            color="white"
                            flexShrink={0}
                          >
                            <Icon as={area.icon} boxSize={8} />
                          </Circle>
                          <VStack spacing={3} align="start" flex={1} h="full" justify="center">
                            <Heading as="h3" size="lg" color={textColor} fontWeight="bold">
                              {area.title}
                            </Heading>
                            <Text color={subtitleColor} fontSize="md" fontWeight="medium">
                              {area.description}
                            </Text>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </MotionCard>
                  ))}
                </SimpleGrid>
              </VStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
