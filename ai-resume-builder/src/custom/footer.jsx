export default function Footer({ darkMode }) {
    return (
      <footer className={`w-full text-center py-4 mt-10 ${darkMode ? "bg-[#1e3a8a] text-blue-300" : "bg-indigo-600 text-white"} fixed bottom-0`}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Resumine. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  