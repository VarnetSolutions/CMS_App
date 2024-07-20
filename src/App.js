
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import AddApplication from './components/Add_Application_url.js';
// import ApplicationUrlsTable from './components/GetApplication_url.js';
import Navbar from './Navbar.js';
// import CombinedComponent from './components/Url_App.js';
import ApplicationManager from './components/Url_App.js';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ApplicationManager/>} />
        {/* <Route path='/get_application_urls' element={<ApplicationUrlsTable/>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
