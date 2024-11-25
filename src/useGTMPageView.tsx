import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGTMPageView = () => {
  const location = useLocation();

  useEffect(() => {
    
    console.log('Sending pageview:', location.pathname);

    if (window.dataLayer) {
      console.log('test')
      console.log('Sending pageview to GTM:', location.pathname);

      // Push a pageview event to the GTM dataLayer
      window.dataLayer.push({
        event: 'pageview',
        page: {
          title: document.title || 'Default Title', // Default title fallback
          path: location.pathname, // Current route
        },
      });
    }
  }, [location]);
};

export default useGTMPageView;
