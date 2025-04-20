import { Box, ScaleFade } from '@chakra-ui/react'
import ProjectTiles  from './components/projectTiles'

function Projects() {
  return (

    <ScaleFade initialScale={0.9} in={true}>
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Box 
        width={{ base: "100%", md: "55%" }}
        maxWidth={{ base: "100%", md: "55%" }} 
        rounded='lg' 
        bg='white'
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <ProjectTiles></ProjectTiles>

    </Box>

</Box>
</ScaleFade>
  );
}

export default Projects;
