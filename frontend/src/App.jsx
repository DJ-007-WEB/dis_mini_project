import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertMessage from './components/AlertMessage';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Assignment from './pages/Assignment';
import Certificate from './pages/Certificate';

const AlertContainer = () => {
  const { alerts, removeAlert } = useContext(AppContext);
  
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {alerts.map(alert => (
        <AlertMessage 
          key={alert.id}
          id={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <AlertContainer />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/assignment/:id" element={<Assignment />} />
              <Route path="/certificate" element={<Certificate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
