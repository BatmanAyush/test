import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import LandingPage from './LandingPage';
import ThankYouPage from './ThankYouPage';

// Custom Hook for GTM Page View Tracking
const useGTMPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.dataLayer) {
      console.log('test')
      
      // Push the current page to GTM
      window.dataLayer.push({
        event: 'pageview',
        page: {
          title: document.title || 'Default Title', // Default title fallback
          path: location.pathname,
        },
      });
    }
  }, [location]); // Trigger whenever the route changes
};

// Main App Component
const App = () => {
  return (
    <Router>
      {/* Wrap Routes in a context for GTM Page View Tracking */}
      <PageViewTracker>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </PageViewTracker>
    </Router>
  );
};

// A wrapper to track page views
const PageViewTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGTMPageView(); // Call the custom hook inside the Router context
  return <>{children}</>;
};

export default App;
