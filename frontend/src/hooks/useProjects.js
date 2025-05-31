import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWithRetry = useCallback(async (url, options = {}, retries = 0) => {
    try {
      return await axios({
        url,
        ...options,
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
    } catch (error) {
      if (retries < MAX_RETRIES && (error.response?.status >= 500 || !error.response)) {
        console.log(`Retrying request (${retries + 1}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
        return fetchWithRetry(url, options, retries + 1);
      }
      throw error;
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `${config.apiBaseUrl}/api/projects`;
      console.log('Fetching projects from:', apiUrl);

      const response = await fetchWithRetry(apiUrl);
      
      if (response.data && Array.isArray(response.data)) {
        console.log('API Response:', response.data);
        
        // For each project, fetch the presigned URL for the image
        const projectsWithPresignedUrls = await Promise.all(
          response.data.map(async project => {
            if (project.imgUrl && project.imgUrl.startsWith('/api/images/')) {
              try {
                const imageResponse = await fetchWithRetry(`${config.apiBaseUrl}${project.imgUrl}`);
                if (imageResponse.data?.url) {
                  return { ...project, imgUrl: imageResponse.data.url };
                }
              } catch (e) {
                console.error('Error fetching presigned URL for', project.imgUrl, e);
                // Use cached URL if available
                const cachedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
                const cachedProject = cachedProjects.find(p => p.id === project.id);
                if (cachedProject?.imgUrl && !cachedProject.imgUrl.startsWith('/api/images/')) {
                  return { ...project, imgUrl: cachedProject.imgUrl };
                }
              }
            }
            return project;
          })
        );

        setProjects(projectsWithPresignedUrls);
        localStorage.setItem('projects', JSON.stringify(projectsWithPresignedUrls));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      const errorMessage = error.response?.data?.error || error.message || 'Error fetching projects';
      setError(errorMessage);
      
      // Use cached data for any error
      const cachedProjects = localStorage.getItem('projects');
      if (cachedProjects) {
        console.log('Using cached projects from localStorage');
        try {
          const parsedProjects = JSON.parse(cachedProjects);
          setProjects(parsedProjects);
        } catch (e) {
          console.error('Error parsing cached projects:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [fetchWithRetry]);

  useEffect(() => {
    console.log('useProjects hook initialized');
    console.log('API Base URL:', config.apiBaseUrl);
    fetchProjects();
  }, [fetchProjects]);

  return { 
    projects, 
    error, 
    loading, 
    fetchProjects
  }; 
};

export default useProjects; 