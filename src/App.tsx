
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';
import ThankYouPage from './ThankYouPage';




const App = () => {
  return (
    <div>
 <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/thankyou" element={<ThankYouPage/>} />
                

      </Routes>

    </Router>
    </div>
  )
}

export default App
