import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';

import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
// We'll rename Home to Resume later or replace its content
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollProgress />
        
        {/* Main Layout Container */}
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 p-4 md:p-8 xl:p-12 transition-colors duration-300 flex justify-center">
          
          {/* Max Width Wrapper */}
          <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-6 relative">
            
            {/* Left Sidebar */}
            <Sidebar />

            {/* Right Main Content */}
            <main className="flex-1 min-w-0 flex flex-col">
              <Navbar />
              
              {/* Content Panel */}
              <div className="bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-800 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-xl relative overflow-hidden flex-1 z-10">
                {/* Border overlay */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 dark:border-white/10" />
                
                <Routes>
                  {/* Redirect /about to / to make About the default page like vcard */}
                  <Route path="/" element={<PageTransition><About /></PageTransition>} />
                  <Route path="/about" element={<Navigate to="/" replace />} />
                  <Route path="/resume" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                </Routes>
              </div>
            </main>
            
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
