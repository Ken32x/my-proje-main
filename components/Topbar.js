import React from 'react';
import { useRouter } from 'next/router';

const Topbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); 
  };
  
  

  return (
    <div className="topbar-container">
      <div className="logo-container">
        <div className="logo">
          <img src="/logo.jpg" alt="catch the moments" />
        </div>
        <div className="logo-text">Catch the Moments</div>
      </div>
      <div className="menu">
        <button onClick={handleLoginClick}>Giriş</button>
      </div>
    </div>
  );
};

export default Topbar;
