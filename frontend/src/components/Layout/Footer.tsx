import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <p className={styles['footer-text']}>
          © {currentYear} ONS - Operador Nacional do Sistema Elétrico
        </p>
        <p className={styles['footer-text']}>
          PDPw - Programação Diária de Produção
        </p>
      </div>
    </footer>
  );
};

export default Footer;
