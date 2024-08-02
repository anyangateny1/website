import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Button, Stack } from '@chakra-ui/react';
import Homepage from './Homepage';
import Projects from './Projects';
import './index.css'

function App() {
  return (
    <Router>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        minHeight="100vh" 
        padding="10px"
      >
        <Box 
          width={{ base: "100%", md: "55%" }}
          maxWidth={{ base: "100%", md: "55%" }} 
          padding="10px" 
          borderBottom="1px solid #ddd"
          rounded='lg' 
        >
          <Stack 
          wrap="shrink"
          spacing={{base: 2, md: 10}} 
          direction="row" 
          justifyContent="center" 
          alignItems="center">
            <Link to="/">
              <Button colorScheme="teal" size={{ base: "sm", md: "md" }}>Home</Button>
            </Link>
            <Link to="/projects">
              <Button colorScheme="teal" size={{ base: "sm", md: "md" }}>Projects</Button>
            </Link>
            <Link to="/about">
              <Button colorScheme="teal" size={{ base: "sm", md: "md" }}>About</Button>
            </Link>
            <Link to="/blog">
              <Button colorScheme="teal" size={{ base: "sm", md: "md" }}>Blog</Button>
            </Link>
          </Stack>
        </Box>

        <Box width="100%">
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/projects" element={<Projects />}/>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;