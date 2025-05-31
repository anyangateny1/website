const config = {
    // AWS API Gateway URL for contact form
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://yhrh5asyof.execute-api.ap-southeast-2.amazonaws.com/prod',
    // S3 bucket URL for images
    s3BaseUrl: 'https://anyang-personal-website.s3.ap-southeast-2.amazonaws.com',
    endpoints: {
        projects: '/api/projects',
        contact: '/api/contact'
    }
};

export default config; 