import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      router.push('/panel');
    } else {
      alert('Lütfen kullanıcı adı ve şifrenizi girin.');
    }
  };

  const handleHomeRedirect = () => {
    router.push("/");
  };

  return (
    <div className="login-container">
      <div className="login-title-box">
        <h2>Giriş Yap</h2>
      </div>
      <div className="login-form">
        <input 
          type="text" 
          placeholder="Kullanıcı Adı" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">Giriş Yap</button>
        <button className="login-button" onClick={handleHomeRedirect}>Ana Sayfaya Dön</button>
      </div>
    </div>
  );
};

export default Login;