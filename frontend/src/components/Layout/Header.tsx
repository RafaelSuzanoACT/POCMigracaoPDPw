import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = 'Usuário' }) => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src="/images/TituloPDPW.gif" alt="PDPw Logo" />
          <h1 className={styles['header-title']}>
            Programação Diária de Produção
          </h1>
        </div>
        <div className={styles['header-user']}>
          <span>Bem-vindo, {userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
