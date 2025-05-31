import React, { useState } from 'react';
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
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Link as ChakraLink,
  Circle,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaHome, 
  FaChevronRight, 
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaUser
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackContactFormSubmit, trackExternalLinkClick } from './utils/analytics';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionCard = motion(Card);

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  const contactMethods = [
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      value: "Connect with me",
      href: "https://linkedin.com/in/anyangateny1",
      color: "blue.600",
      gradient: "linear(to-r, blue.500, blue.700)"
    },
    {
      icon: FaGithub,
      title: "GitHub",
      value: "View my code",
      href: "https://github.com/anyangateny1",
      color: "gray.700",
      gradient: "linear(to-r, gray.600, gray.800)"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://yhrh5asyof.execute-api.ap-southeast-2.amazonaws.com/prod/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track successful form submission
        trackContactFormSubmit();
        
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Check if it's an email verification error
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message && errorData.message.includes('not verified')) {
          toast({
            title: "Contact form temporarily unavailable",
            description: "Please reach out directly via LinkedIn",
            status: "warning",
            duration: 8000,
            isClosable: true,
          });
        } else {
          throw new Error('Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Contact form temporarily unavailable",
        description: "Please reach out directly via LinkedIn",
        status: "warning",
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Contact
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Badge */}
            <Badge
              colorScheme="green"
              variant="subtle"
              px={8}
              py={4}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              <Icon as={FaEnvelope} mr={2} />
              Get In Touch
            </Badge>
          </MotionVStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={24}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="3xl" boxShadow="0 10px 30px rgba(0,0,0,0.1)">
                <CardBody p={10}>
                  <VStack spacing={8} align="stretch">
                    <HStack spacing={4}>
                      <Circle size="60px" bg="green.500" color="white">
                        <Icon as={FaPaperPlane} boxSize={7} />
                      </Circle>
                      <Heading as="h2" size="xl" color={textColor} fontWeight="bold">
                        Send a Message
                      </Heading>
                    </HStack>

                    <Box as="form" onSubmit={handleSubmit}>
                      <VStack spacing={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                          <FormControl isRequired>
                            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Name</FormLabel>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                              bg={inputBg}
                              border="2px solid"
                              borderColor={borderColor}
                              borderRadius="xl"
                              h="12"
                              _hover={{ borderColor: 'green.300' }}
                              _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                            />
                          </FormControl>

                          <FormControl isRequired>
                            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Email</FormLabel>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              bg={inputBg}
                              border="2px solid"
                              borderColor={borderColor}
                              borderRadius="xl"
                              h="12"
                              _hover={{ borderColor: 'green.300' }}
                              _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                            />
                          </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                          <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Subject</FormLabel>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            bg={inputBg}
                            border="2px solid"
                            borderColor={borderColor}
                            borderRadius="xl"
                            h="12"
                            _hover={{ borderColor: 'green.300' }}
                            _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Message</FormLabel>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell me about your project or idea..."
                            rows={6}
                            bg={inputBg}
                            border="2px solid"
                            borderColor={borderColor}
                            borderRadius="xl"
                            _hover={{ borderColor: 'green.300' }}
                            _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                          />
                        </FormControl>

                        <Button
                          type="submit"
                          leftIcon={<FaPaperPlane />}
                          bgGradient="linear(to-r, green.500, teal.600)"
                          color="white"
                          size="lg"
                          w="full"
                          h="14"
                          isLoading={isSubmitting}
                          loadingText="Sending..."
                          _hover={{
                            bgGradient: "linear(to-r, green.600, teal.700)",
                            transform: 'translateY(-2px)',
                            boxShadow: '0 15px 35px rgba(72, 187, 120, 0.4)'
                          }}
                          transition="all 0.3s"
                          borderRadius="xl"
                          fontSize="md"
                          fontWeight="semibold"
                        >
                          Send Message
                        </Button>
                      </VStack>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </MotionBox>

            {/* Contact Information */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VStack spacing={8} align="stretch">
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
                    <Icon as={FaUser} mr={2} />
                    Connect
                  </Badge>
                  <Text color={subtitleColor} fontSize="xl" fontWeight="medium">
                    Choose your preferred way to reach out
                  </Text>
                </VStack>

                <VStack spacing={6}>
                  {contactMethods.map((method, index) => (
                    <MotionCard
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ 
                        y: -8,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      bg={bgColor}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="2xl"
                      overflow="hidden"
                      _hover={{ 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        borderColor: method.color,
                      }}
                      w="full"
                    >
                      <Box
                        h="4px"
                        bgGradient={method.gradient}
                        w="full"
                      />
                      <CardBody p={8}>
                        <ChakraLink 
                          href={method.href} 
                          isExternal 
                          _hover={{ textDecoration: 'none' }}
                          onClick={() => trackExternalLinkClick(method.title.toLowerCase(), method.href)}
                        >
                          <HStack spacing={6}>
                            <Circle
                              size="60px"
                              bgGradient={method.gradient}
                              color="white"
                            >
                              <Icon as={method.icon} boxSize={7} />
                            </Circle>
                            <VStack spacing={2} align="start" flex={1}>
                              <Heading as="h3" size="lg" color={textColor} fontWeight="bold">
                                {method.title}
                              </Heading>
                              <Text color={subtitleColor} fontSize="md" fontWeight="medium">
                                {method.value}
                              </Text>
                            </VStack>
                          </HStack>
                        </ChakraLink>
                      </CardBody>
                    </MotionCard>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}

export default Contact; 
