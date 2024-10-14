import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjects = () => {
  const [projects, setProjects] = useState(JSON.parse(localStorage.getItem('projects')) || []);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/getProjects');
      localStorage.setItem('projects', JSON.stringify(response.data));
      setProjects(response.data); 
    } catch (error) {
      setError('Error fetching data');
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('projects')) {
      fetchProjects();
    } else {
      setProjects(JSON.parse(localStorage.getItem('projects')));
    }
  }, []);

  return { projects, error, fetchProjects }; 
};

export default useProjects;
