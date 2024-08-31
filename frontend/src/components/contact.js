import React, { useState } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Stack, Heading, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

    axios.post('/contact', formData)
      .then(response => {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error submitting the form.');
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
      marginTop="10%"
    >
      <Heading fontSize='25px' marginBottom="10px" textAlign="center">Want to contact me?</Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}> 
        <Stack spacing={4} width="100%" maxWidth="500px" margin="auto"> 
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isRequired
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isRequired
            />
          </FormControl>
          <FormControl id="message" mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea 
              placeholder="Tell me something."
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              isRequired
            />
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit" isLoading={isLoading}>Submit</Button>
        </Stack>
        {success && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            <AlertTitle>Form submitted successfully!</AlertTitle>
          </Alert>
        )}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default ContactForm;
