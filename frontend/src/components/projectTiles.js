import React, { useEffect } from 'react';
import { SimpleGrid, Box, Text, Image, Heading, Stack } from '@chakra-ui/react';
import useProjects from './useProjects'; 

const parseTags = ({ tags }) => {
  const tagLines = tags.split(' ');

  return (
    <Stack direction="row" spacing="3" wrap="wrap" display="flex" justifyContent="center" alignContent="center">
      {tagLines.map((tag, index) => 
        tag ? (
          <Text key={index} fontSize="xs" bg="teal" padding="4px" color='white' fontWeight='bold'>
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
  const { projects, error } = useProjects();

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      {error && <p>{error}</p>}
      {projects.map(project => (
        <Box 
          key={project.id}
          rounded="lg"
          padding="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Image src={project.img_url} alt={project.project_name} w="100%" h="70%" maxHeight="210px" margin="5px" justifySelf="center" />                
          <Heading fontSize="2xl" marginTop='5px'>{project.project_name}</Heading>
          <Text 
            fontSize="sm" 
            overflow="hidden" 
            textAlign="center" 
            marginBottom={1}
            noOfLines={3}
            height="50px"
          >
            {project.description}
          </Text>                
          {parseTags({ tags: project.tags })}      
        </Box>
      ))}
    </SimpleGrid>
  );
};

const SmallTiles = () => {
  const { projects, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (error) return <p>{error}</p>;

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      {projects.slice(1, 3).map(project => (
        <Box 
          key={project.id}
          rounded="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Image src={project.img_url} alt={project.project_name} w="100%" h="70%" margin="5px" justifySelf="center" />                
          <Heading fontSize="2xl" marginTop='5px' marginBottom='5px'>{project.project_name}</Heading>
          {parseTags({ tags: project.tags })}              
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ProjectTiles;

export { SmallTiles };
