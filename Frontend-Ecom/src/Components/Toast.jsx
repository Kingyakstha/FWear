import React, { useEffect } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideIn">
        <IoMdCheckmarkCircleOutline />
        {message}
        </div>
    </div>
  );
};

export default Toast;