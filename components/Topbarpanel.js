import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopbarPanel = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="topbar-panel-container">
      <div className="topbar-panel-logo-container">
        <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
      </div>
      <div className="topbar-panel-logout-container">
        <button className="topbar-panel-logout-button" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default TopbarPanel;
