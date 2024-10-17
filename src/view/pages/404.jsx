import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
