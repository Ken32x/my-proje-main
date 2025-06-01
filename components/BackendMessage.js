import { useEffect, useState } from 'react';

const BackendMessage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('API Hatası:', err));
  }, []);

  return (
    <div
      data-aos="fade-up"
      style={{
        margin: '40px auto',
        padding: '24px 32px',
        background: '#fff',
        borderRadius: '12px',
        maxWidth: '600px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>🎯 Backend'den Gelen Mesaj:</h3>
      <p>{message || 'Yükleniyor...'}</p>
    </div>
  );
};

export default BackendMessage;
