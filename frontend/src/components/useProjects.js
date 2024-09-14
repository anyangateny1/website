import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjects = () => {
  const [projects, setProjects] = useState(JSON.parse(localStorage.getItem('projects')) || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('projects')) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:8000/getProjects');
          localStorage.setItem('projects', JSON.stringify(response.data));  
        } catch (error) {
          setError('Error fetching data');
          console.error('There was an error!', error);
        }
      };

      fetchProjects();
    } else {
      setProjects(JSON.parse(localStorage.getItem('projects'))); 
    }
  }, []);

  return { projects, error };
};

export default useProjects;
