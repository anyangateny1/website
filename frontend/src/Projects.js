import { Box } from '@chakra-ui/react'
import ProjectTiles  from './components/projectTiles'

function Projects() {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Box 
        width={{ base: "100%", md: "55%" }}
        maxWidth={{ base: "100%", md: "55%" }} 
        rounded='lg' 
        padding="25px" 
        bg='white'
      >
        <ProjectTiles></ProjectTiles>

    </Box>

</Box>

  );
}

export default Projects;
