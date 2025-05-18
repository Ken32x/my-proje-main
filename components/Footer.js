import React from "react";


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <h3>Menü</h3>
        <ul>
          <li>Anasayfa</li>
          <li>Nasıl Kullanılır?</li>
          <li>İletişim</li>
          <li className="underline">Kurumsal</li>
        </ul>
        <div className="payment-icons">
          <img src="/Iyzico.jpg" alt="Iyzico" />
          <img src="/Mastercard.png" alt="Mastercard" />
          <img src="/Visa.png" alt="Visa" />
          <img src="/Amex.webp" alt="American Express" />
        </div>
      </div>

      <div className="footer-column">
        <h3>Bilgilendirme</h3>
        <ul>
          <li>KVKK Gizlilik Politikası</li>
          <li>Kullanım Sözleşmesi</li>
          <li>Çerez Politikası</li>
        </ul>
      </div>

      <div className="footer-column footer-logo">
        <img src="/logo.jpg" alt=" Yakala" />
      </div>

      <div className="footer-column">
        <h3>İletişime Geç</h3>
        <p>Catch The Moments</p>
        <div className="social-icons">
          <img src="/wp.png" alt="WhatsApp" />
          <img src="/insta.jpeg" alt="Instagram" />
          <img src="/tiktok.png" alt="TikTok" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
