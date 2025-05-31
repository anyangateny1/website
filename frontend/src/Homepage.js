import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  Avatar,
  Divider,
  Badge,
  keyframes,
  Circle,
  Tooltip
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaCloud,
  FaAws, 
  FaGitAlt,
  FaExternalLinkAlt,
  FaRocket,
  FaCode,
  FaLightbulb,
  FaStar
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiDocker,
  SiSpringboot,
  SiVuedotjs,
  SiCplusplus
} from 'react-icons/si';
import ProjectTiles from './components/projectTiles';
import { trackResumeDownload, trackButtonClick } from './utils/analytics';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionText = motion(Text);

// Floating animation keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(5deg); }
  66% { transform: translateY(5px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const skillCategories = [
  {
    title: "Frontend",
    icon: FaCode,
    gradient: "linear(to-br, blue.400, purple.500)",
    skills: [
      { name: "Vue.js", icon: SiVuedotjs, color: "green.500" },
      { name: "TypeScript", icon: SiTypescript, color: "blue.600" },
      { name: "JavaScript", icon: SiJavascript, color: "yellow.400" },
      { name: "React", icon: FaReact, color: "blue.400" }
    ]
  },
  {
    title: "Backend",
    icon: FaRocket,
    gradient: "linear(to-br, green.400, teal.500)",
    skills: [
      { name: "Python", icon: FaPython, color: "blue.500" },
      { name: "Java", icon: FaJava, color: "red.500" },
      { name: "Spring Boot", icon: SiSpringboot, color: "green.600" }
    ]
  },
  {
    title: "Systems",
    icon: FaLightbulb,
    gradient: "linear(to-br, purple.400, pink.500)",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "blue.600" },
      { name: "Python", icon: FaPython, color: "blue.500" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: FaCloud,
    gradient: "linear(to-br, orange.400, red.500)",
    skills: [
      { name: "AWS", icon: FaAws, color: "orange.400" },
      { name: "Docker", icon: SiDocker, color: "blue.500" },
      { name: "Git", icon: FaGitAlt, color: "red.500" }
    ]
  }
];

// Typing animation hook
const useTypingEffect = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Floating background elements
function FloatingElements() {
  const elements = [
    { icon: FaReact, color: "blue.400", size: "40px", top: "10%", left: "10%" },
    { icon: FaNodeJs, color: "green.500", size: "35px", top: "20%", right: "15%" },
    { icon: FaPython, color: "blue.500", size: "30px", top: "60%", left: "5%" },
    { icon: FaAws, color: "orange.400", size: "45px", top: "70%", right: "10%" },
    { icon: SiJavascript, color: "yellow.400", size: "25px", top: "40%", left: "85%" },
    { icon: SiDocker, color: "blue.500", size: "35px", top: "80%", left: "20%" }
  ];

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" zIndex={0}>
      {elements.map((element, index) => (
        <Box
          key={index}
          position="absolute"
          top={element.top}
          left={element.left}
          right={element.right}
          animation={`${float} ${3 + index * 0.5}s ease-in-out infinite`}
          opacity={0.1}
        >
          <Icon as={element.icon} color={element.color} boxSize={element.size} />
        </Box>
      ))}
    </Box>
  );
}

function HeroSection() {
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.500, purple.600)',
    'linear(to-r, blue.300, purple.400)'
  );
  
  const typedText = useTypingEffect("Final Year Computer Science Student", 80);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box position="relative" overflow="hidden" minH="90vh" display="flex" alignItems="center">
      <FloatingElements />
      <Container maxW="container.xl" py={16} position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
        >
          <VStack spacing={10}>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar
                size="2xl"
                name="Anyang Ateny"
                bg={gradientBg}
                color="white"
                fontSize="3xl"
                fontWeight="bold"
                boxShadow="0 0 40px rgba(66, 153, 225, 0.4)"
                border="4px solid"
                borderColor="white"
                _dark={{ borderColor: "gray.700" }}
              />
            </MotionBox>
            
            <VStack spacing={6}>
              <Heading
                as="h1"
                size="3xl"
                color={textColor}
                fontWeight="extrabold"
                lineHeight="shorter"
                letterSpacing="tight"
              >
                Hi, I'm{' '}
                <Text
                  as="span"
                  bgGradient={gradientBg}
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Anyang Ateny
                </Text>
              </Heading>
              
              <Box minH="70px">
                <MotionText
                  fontSize="2xl"
                  color="blue.500"
                  fontWeight="semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {typedText}
                  <Text as="span" animation={`${pulse} 1s infinite`} color="blue.400">
                    |
                  </Text>
                </MotionText>
              </Box>

              <AnimatePresence>
                {showSubtitle && (
                  <MotionText
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    fontSize="xl"
                    color={subtitleColor}
                    maxW="3xl"
                    lineHeight="tall"
                    fontWeight="medium"
                  >
                  Distributed systems and networking major with systems programming experience interested in learning and building innovative solutions to interesting projects. 
                  </MotionText>
                )}
              </AnimatePresence>
            </VStack>

            <HStack spacing={6} flexWrap="wrap" justify="center">
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  as="a"
                  href="/files/Anyang_Ateny_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaExternalLinkAlt />}
                  size="lg"
                  bgGradient="linear(to-r, blue.500, purple.600)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, blue.600, purple.700)",
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 35px rgba(66, 153, 225, 0.4)'
                  }}
                  transition="all 0.3s"
                  borderRadius="full"
                  px={10}
                  py={6}
                  fontSize="md"
                  fontWeight="semibold"
                  onClick={trackResumeDownload}
                >
                  View Resume
                </Button>
              </MotionBox>
              
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  as="a"
                  href="#projects"
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                  _hover={{ 
                    transform: 'translateY(-3px)', 
                    boxShadow: '0 15px 35px rgba(66, 153, 225, 0.2)',
                    borderColor: 'blue.500'
                  }}
                  transition="all 0.3s"
                  borderRadius="full"
                  px={10}
                  py={6}
                  fontSize="md"
                  fontWeight="semibold"
                  borderWidth="2px"
                  onClick={() => trackButtonClick('view_projects', 'hero_section')}
                >
                  View Projects
                </Button>
              </MotionBox>
            </HStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

function SkillsSection() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const skillHoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box py={24} bg={sectionBg} position="relative">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={16}>
            <VStack spacing={6} textAlign="center">
              <Badge
                colorScheme="blue"
                variant="subtle"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="md"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                <Icon as={FaStar} mr={2} />
                Technical Expertise
              </Badge>
              <Heading as="h2" size="2xl" color={textColor} fontWeight="extrabold" letterSpacing="tight">
                Skills & Technologies
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="xl" maxW="2xl" fontWeight="medium">
                Technologies I'm learning and applying in my personal projects and work experience
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {skillCategories.map((category, categoryIndex) => (
                <MotionCard
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
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
                    borderColor: 'blue.300',
                  }}
                  h="full"
                >
                  <Box
                    h="5px"
                    bgGradient={category.gradient}
                    w="full"
                  />
                  <CardBody p={8} h="full">
                    <VStack spacing={6} align="stretch" h="full">
                      <VStack spacing={4}>
                        <Circle
                          size="60px"
                          bgGradient={category.gradient}
                          color="white"
                        >
                          <Icon as={category.icon} boxSize={7} />
                        </Circle>
                        <Heading as="h3" size="lg" color={textColor} fontWeight="bold" textAlign="center">
                          {category.title}
                        </Heading>
                      </VStack>
                      <Divider />
                      <VStack spacing={4} flex={1}>
                        {category.skills.map((skill, skillIndex) => (
                          <Box key={skill.name} w="full">
                            <HStack spacing={4} w="full" justify="start" p={2} borderRadius="lg" _hover={{ bg: skillHoverBg }} transition="all 0.2s">
                              <Icon as={skill.icon} color={skill.color} boxSize={5} />
                              <Text color={textColor} fontWeight="semibold" fontSize="md">
                                {skill.name}
                              </Text>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

function ProjectsSection() {
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box py={24} id="projects" position="relative">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={16}>
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
                <Icon as={FaRocket} mr={2} />
                Portfolio
              </Badge>
              <Heading as="h2" size="2xl" color={textColor} fontWeight="extrabold" letterSpacing="tight">
                Featured Projects
              </Heading>
              <Text color={subtitleColor} fontSize="xl" maxW="2xl" fontWeight="medium">
                A showcase of my personal projects
              </Text>
            </VStack>

            <Box w="full">
              <ProjectTiles />
            </Box>

            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                to="/projects"
                rightIcon={<FaExternalLinkAlt />}
                size="lg"
                bgGradient="linear(to-r, purple.500, pink.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, purple.600, pink.700)",
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(159, 122, 234, 0.4)'
                }}
                transition="all 0.3s"
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
              >
                View All Projects
              </Button>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

function Homepage() {
  return (
    <Box>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
    </Box>
  );
}

export default Homepage;
