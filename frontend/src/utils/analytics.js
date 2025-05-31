// Analytics utility for tracking user interactions

// Check if gtag is available
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (isGtagAvailable()) {
    window.gtag('event', eventName, parameters);
  }
  
  // Also log to console for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};

// Specific tracking functions
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'engagement',
    event_label: 'resume_pdf',
    value: 1
  });
};

export const trackProjectClick = (projectName) => {
  trackEvent('project_click', {
    event_category: 'engagement',
    event_label: projectName,
    value: 1
  });
};

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
    value: 1
  });
};

export const trackExternalLinkClick = (linkName, url) => {
  trackEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkName,
    link_url: url,
    value: 1
  });
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    event_label: pageName,
    value: 1
  });
};

export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location,
    value: 1
  });
};

// Track time spent on page
export const trackTimeOnPage = (pageName, timeInSeconds) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    event_label: pageName,
    value: Math.round(timeInSeconds)
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage
  });
}; 