import { useUser, UserButton } from "@clerk/clerk-react";

export default function Header({ darkMode, setDarkMode }) {
  const { isSignedIn, user } = useUser();

  return (
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

        {/* User Authentication Section */}
        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm">{user.fullName}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <a href="/sign-in" className="bg-white text-indigo-600 px-4 py-1 rounded-lg shadow hover:bg-gray-100">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
