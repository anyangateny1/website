import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Text, Image, Heading, Stack } from '@chakra-ui/react';
import axios from 'axios';

const parseTags = ({ tags }) => {

  const tagLines = tags.split(' ');

  return (
    <Stack direction="row" spacing="3" wrap="wrap" display="flex" justifyContent="center" alignContent="center">
      {tagLines.map((tag, index) => 
        tag ? (
          <Text key={index} 
          fontSize="xs" 
          bg="teal" 
          padding="4px"
          color='white'
          fontWeight='bold'
          >
            {tag.toUpperCase()}
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

const ProjectTiles = () => {
  const [ProjectTiles, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/getProjects')
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
       {ProjectTiles.map(project => (
              <Box 
              rounded="lg"
              padding="10px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column" key={project.id}>
                <Image src={project.img_url} alt={project.project_name} w="100%" h="70%" margin="5px" justifySelf="center"/>                
                <Heading fontSize="2xl" marginTop='5px'>{project.project_name}</Heading>
                <Text fontSize="sm" textAlign="center" marginBottom={1}>{project.desc}</Text>
                {parseTags({ tags: project.tags })}              
                </Box>
        ))}
    </SimpleGrid>
  );
};

export const SmallTiles = () => {
  const [SmallTiles, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/getProjects')
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
       {SmallTiles.slice(1, 3).map(project => (
              <Box 
              rounded="lg"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column" key={project.id}>
                <Image src={project.img_url} alt={project.project_name} w="100%" h="70%" margin="5px" justifySelf="center"/>                
                <Heading fontSize="2xl" marginTop='5px' marginBottom='5px'>{project.project_name}</Heading>
                {parseTags({ tags: project.tags })}              
                </Box>
        ))}
    </SimpleGrid>
  );
};
export default ProjectTiles;
