import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://github.com/torgbuiedunyenyo/coordinate-plane" target="_blank" rel="noopener noreferrer">
          <img src="github-svgrepo-com.svg" alt="GitHub" className={styles.icon} />
        </a>
        <a href="https://handshakefyi.substack.com/?utm_source=coordinate-plane" target="_blank" rel="noopener noreferrer">
          <img src="substack-reader-svgrepo-com.svg" alt="Substack" className={styles.icon} />
        </a>
        <a href="https://www.linkedin.com/in/jeremy-kirshbaum-6294b01a1/" target="_blank" rel="noopener noreferrer">
          <img src="linkedin-svgrepo-com.svg" alt="LinkedIn" className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;