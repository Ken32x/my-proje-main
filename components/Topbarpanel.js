import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaMoon, FaSun, FaBell, FaUserCircle, FaUpload } from 'react-icons/fa';

const TopbarPanel = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleUploadClick = () => {
    router.push('/upload');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="topbar-panel">
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
        <button onClick={handleUploadClick} className="menu-button">
          <FaUpload style={{ marginRight: '6px' }} /> Anı Yükle
        </button>
        <button className="icon-button"><FaBell /></button>
        <button className="icon-button"><FaMoon /></button>

        <div className="user-menu-wrapper">
          <button className="icon-button" onClick={() => setShowMenu(!showMenu)}>
            <FaUserCircle />
          </button>
          {showMenu && (
            <div className="user-dropdown">
              <button onClick={handleLogout}>Çıkış</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopbarPanel;