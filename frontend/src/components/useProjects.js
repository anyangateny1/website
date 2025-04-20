import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const useProjects = () => {
  const [projects, setProjects] = useState(JSON.parse(localStorage.getItem('projects')) || []);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}${config.endpoints.projects}`);
      const projectsData = response.data;
      
      // Transform the data to match the frontend structure
      const transformedProjects = projectsData.map(project => ({
        id: project.id,
        project_name: project.projectName,
        description: project.desc,
        img_url: project.imgUrl,
        tags: project.tags // Keep tags as an array
      }));

      localStorage.setItem('projects', JSON.stringify(transformedProjects));
      setProjects(transformedProjects);
    } catch (error) {
      setError('Error fetching projects');
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, error, fetchProjects };
};

export default useProjects;
