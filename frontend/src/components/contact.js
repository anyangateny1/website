import React, { useState } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Stack, Heading } from '@chakra-ui/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('/contact', formData)
      .then(response => {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); 
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error submitting the form.');
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
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="message" mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea 
              placeholder="Tell me something."
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactForm;
