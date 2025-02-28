import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <nav className={`w-full flex justify-between items-center py-4 px-8 ${darkMode ? "bg-[#1e3a8a]" : "bg-indigo-600"} text-white shadow-md fixed top-0 left-0 right-0 z-10`}>
        <h1 className="text-2xl font-bold">Resumine</h1>
        
        <div className="flex items-center space-x-6">
          <a href="#templates" className="hover:underline">Templates</a>
          <a href="#contact" className="hover:underline">Contact</a>

          <button onClick={() => setDarkMode(!darkMode)} className="px-6 py-1 rounded">
            <img 
              src={darkMode ? "/moon.png" : "/544209.png"} 
              alt={darkMode ? "Light Mode" : "Dark Mode"} 
              className="w-6 h-6"
            />
          </button>
        </div>
      </nav>

      {/* Main Content with padding to prevent overlap */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`w-full text-center p-4 mt-4 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>
        <p>© 2024 Resumine. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
