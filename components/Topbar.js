import React from 'react';
import { useRouter } from 'next/router';
import { FaMoon, FaUserCircle } from 'react-icons/fa';

const TopbarMinimal = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); 
  };

  return (
    <div className="topbar-minimal">
      <div className="logo-container">
        <div className="logo">
          <img src="/logo.jpg" alt="catch the moments" />
        </div>
        <div className="logo-text">Catch the Moments</div>
      </div>

      <div className="center-items">
        <input type="text" placeholder="Anı ara..." className="search-input" />
      </div>

      <div className="menu">
        <button className="icon-button">
          <FaMoon className="icon-svg" />
        </button>
        <button onClick={handleLoginClick} className="icon-button">
          <FaUserCircle className="icon-svg" />
        </button>
      </div>
    </div>
  );
};

export default TopbarMinimal;