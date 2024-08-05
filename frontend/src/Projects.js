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
        width={{ base: "100%", md: "66%" }}
        maxWidth={{ base: "100%", md: "66%" }} 
        rounded='lg' 
        bg='white'
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <ProjectTiles></ProjectTiles>

    </Box>

</Box>

  );
}

export default Projects;
