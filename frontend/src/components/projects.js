import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Text, Image, Heading, Stack } from '@chakra-ui/react';
import axios from 'axios';

const parseTags = ({ tags }) => {

  const tagLines = tags.split(' ');

  return (
    <Stack direction="row" spacing="3" wrap="wrap">
      {tagLines.map((tag, index) => 
        tag ? (
          <Text key={index} 
          fontSize="sm" 
          bg="gray" 
          paddingLeft='5px' 
          paddingRight='5px' 
          paddingBottom='2px' 
          color='white'
          rounded='lg'
          margin={1}>
            {tag}
          </Text>
        ) : (
          <Text key={index} fontSize="sm" bg='white' p={1} mr={1}>
            {'\u00A0'}
          </Text>
        )
      )}
    </Stack>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.20:8000/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        setError('Error fetching data');
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      {error && <p>{error}</p>}
       {projects.map(project => (
              <Box 
              rounded="lg"
              padding="10px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column" key={project.id}>
              <Text fontSize="sm" 
              bg="teal" 
              paddingLeft='5px' 
              paddingRight='5px' 
              paddingBottom='2px' 
              color='white'
              rounded='lg'
              margin={2}>
              {project.project_date}
              </Text>
                <Image src={project.img_url} alt={project.project_name} w="100%" h="70%" margin="5px" justifySelf="center"/>                
                <Heading fontSize="xl">{project.project_name}</Heading>
                {parseTags({ tags: project.tags })}              
                </Box>
        ))}
    </SimpleGrid>
  );
};

export default Projects;
