import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App'; // Main App component
import ResumeLandingPage from "./landing_area/Resume-landing-area.jsx"; // Landing Page
import SignInPage from './Sign_in/singn.jsx'; // Sign-in Page
import Dashboard from './dashboard/dashboard.jsx'; // Fixed component name
import { ClerkProvider } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

import { Navigate } from "react-router-dom";
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx';
import ViewResume from './my-resume/[resumeId]/view/view.jsx';

const router = createBrowserRouter([
  { path: "/", element: <ResumeLandingPage /> },
  { path: "/sign-in", element: <SignInPage /> },
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard/resume/:resumeId/edit", element: <EditResume /> },
    ],
  },
  { path: "/dashboard", element: <Navigate to="/app/dashboard" replace /> },
  {path:'/my-resume/:resumeId/view',element:< ViewResume/>}
]);



// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
