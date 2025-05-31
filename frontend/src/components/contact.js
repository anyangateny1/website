import React, { useState } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Stack, Heading, Alert, AlertIcon, AlertTitle, useColorModeValue } from '@chakra-ui/react';
import config from '../config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    axios.post(`${config.apiBaseUrl}${config.endpoints.contact}`, formData)
      .then(response => {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error submitting the form. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      p={6}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading 
        fontSize='2xl' 
        mb={6}
        color={textColor}
      >
        Want to contact me?
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}> 
        <Stack spacing={4} width="100%" maxWidth="500px" margin="auto"> 
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
          </FormControl>
          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea 
              placeholder="Tell me something."
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              borderColor={borderColor}
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
          </FormControl>
          <Button 
            colorScheme="blue" 
            width="full" 
            type="submit" 
            isLoading={isLoading}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            Submit
          </Button>
        </Stack>
        {success && (
          <Alert status="success" mt={4} borderRadius="md">
            <AlertIcon />
            <AlertTitle>Form submitted successfully!</AlertTitle>
          </Alert>
        )}
        {error && (
          <Alert status="error" mt={4} borderRadius="md">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default ContactForm;
