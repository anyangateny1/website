import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching from:', `${BACKEND_URL}/api/projects`);

      const response = await axios.get(`${BACKEND_URL}/api/projects`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response);
      
      if (response.data) {
        // The response already contains presigned URLs, so we can use it directly
        setProjects(response.data);
        localStorage.setItem('projects', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      const errorMessage = error.response?.data?.error 
        || error.message 
        || 'Error fetching projects';
      setError(errorMessage);
      // Try to load from localStorage as fallback
      const cachedProjects = localStorage.getItem('projects');
      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { 
    projects, 
    error, 
    loading, 
    fetchProjects,
    backendUrl: BACKEND_URL
  }; 
};

export default useProjects; 