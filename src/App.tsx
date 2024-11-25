import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ThankYouPage from './ThankYouPage';
import useGTMPageView from './useGTMPageView'; // Import the custom hook

const App = () => {
  return (
    <Router>
      <PageViewTracker>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </PageViewTracker>
    </Router>
  );
};

const PageViewTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useGTMPageView(); // Apply the hook to track page views
  return <>{children}</>;
};

export default App;
