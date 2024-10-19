import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from "sonner";
import { Toaster as RToaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-full dark:bg-gray-700"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        <Toaster position='top-right' />
        <RToaster position='top-left' toastOptions={{ duration: 2000 }} />
        <div className="pt-16">
          <Outlet />
        </div>
      </div >
    </>
  );
}
