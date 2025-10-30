import React from 'react';
const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-600 mt-5 font-medium">
    {message}
  </div>
);

export default ErrorMessage;
