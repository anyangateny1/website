import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Button, Stack } from '@chakra-ui/react';
import Homepage from './Homepage';

function App() {
  return (
    <Router>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        minHeight="100vh" 
        padding="10px"
        bg='black'
      >
        <Box 
          width="100%" 
          maxWidth="55%"
          padding="10px" 
          borderBottom="1px solid #ddd"
          rounded='lg' 
          bg='white'
        >
          <Stack spacing={10} direction="row" justifyContent="center" alignItems="center">
            <Link to="/">
              <Button colorScheme="teal">Home</Button>
            </Link>
            <Link to="/about">
              <Button colorScheme="teal">About</Button>
            </Link>
            <Link to="/blog">
              <Button colorScheme="teal">Blog</Button>
            </Link>
          </Stack>
        </Box>

        <Box width="100%">
          <Routes>
            <Route path="/" element={<Homepage />}/>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
