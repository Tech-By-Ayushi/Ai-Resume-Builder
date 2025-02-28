import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../custom/header.jsx";  
import { useNavigate } from "react-router-dom";
import Footer from "../custom/footer.jsx";

export default function ResumeLandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // ✅ Fixed placement

  // Set body background color dynamically
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-blue-300");
      document.body.classList.remove("bg-gradient-to-b", "from-gray-200", "to-white", "text-gray-800");
    } else {
      document.body.classList.add("bg-gradient-to-b", "from-gray-200", "to-white", "text-gray-800");
      document.body.classList.remove("bg-gray-900", "text-blue-300");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center text-center p-6">
      {/* Use the imported Header component */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-24 space-y-6 max-w-3xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className={`text-4xl font-bold ${darkMode ? 'text-blue-300' : 'text-gray-800'}`}
        >
          Revamp your CV in one click!
        </motion.h2>
        <p className={`max-w-lg ${darkMode ? 'text-blue-300' : 'text-gray-700'}`}>
          Top Resume Templates, Build a Perfect Resume with Ease. Start now! Create a professional resume in just 15 minutes. Impress employers with fast and simple processes.
        </p>

        <motion.div whileHover={{ scale: 1.1 }}>
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-500 hover:to-indigo-500"
            onClick={() => {
              console.log("Navigating to sign-in page...");
              navigate("/sign-in", { state: { redirectTo: "/dashboard" } });
            }}

          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="mt-16 flex flex-col items-center space-y-4 w-full">
        <motion.div 
          className="flex space-x-8 bg-gray-100 dark:bg-[#505f92] p-6 rounded-lg shadow-lg max-w-4xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-white'}`}>Different Templates</h3>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-white'}`}>Choose from a variety of professional resume templates.</p>
          </div>
          <div className="text-center">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-white'}`}>Proven Resume Formats</h3>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-white'}`}>Use templates that have been tested and approved by recruiters.</p>
          </div>
        </motion.div>
      </div>

      {/* Sample Resume Previews
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="text-white dark:bg-[#505f92] p-4 rounded-lg shadow-lg w-64">
          <img src="/resume1.png" alt="Sample Resume 1" className="rounded-lg" />
          <p className={`mt-2 ${darkMode ? 'text-blue-400' : 'text-white'} font-semibold`}>Modern Resume</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="text-white dark:bg-[#505f92] p-4 rounded-lg shadow-lg w-64">
          <img src="/resume2.png" alt="Sample Resume 2" className="rounded-lg" />
          <p className={`mt-2 ${darkMode ? 'text-blue-400' : 'text-white'} font-semibold`}>Classic Resume</p>
        </motion.div>
      </div> */}
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
