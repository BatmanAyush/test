
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';




const App = () => {
  return (
    <div>
 <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />

                

      </Routes>

    </Router>
    </div>
  )
}

export default App
