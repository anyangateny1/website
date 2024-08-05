import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Button, Stack } from '@chakra-ui/react';
import Homepage from './Homepage';
import Projects from './Projects';
import About from './About';
import './index.css';

function App() {
  return (
    <Router>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        minHeight="100vh" 
        padding="10px"
        width="100%"
      >
        <Box 
          width={{ base: "100%", md: "55%" }}
          padding="10px" 
          borderBottom="1px solid #ddd"
          rounded="lg"
          mb="4"
        >
          <Stack 
            spacing={{ base: 10, md: 10 }} 
            direction="row" 
            justifyContent="center" 
            alignItems="center"
          >
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

        <Box width="100%" flex="1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
