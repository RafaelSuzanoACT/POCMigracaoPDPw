import React, { useState } from 'react';
import { MenuItem } from '../../types/menu';
import styles from './Navigation.module.css';

interface NavigationProps {
  menuItems: MenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (index: number) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(index)) {
      newOpenDropdowns.delete(index);
    } else {
      newOpenDropdowns.add(index);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasChildren = item.Childs && item.Childs.length > 0;

    if (!item.Published || !item.Enabled) {
      return null;
    }

    if (hasChildren) {
      return (
        <li
          key={index}
          className={`${styles['nav-item']} ${styles.dropdown} ${
            openDropdowns.has(index) ? styles.open : ''
          }`}
          onClick={() => toggleDropdown(index)}
        >
          <span className={styles['nav-link']}>
            {item.Title}
          </span>
          <ul className={styles['dropdown-menu']}>
            {item.Childs.map((child, childIndex) => {
              if (!child.Published || !child.Enabled) {
                return null;
              }
              return (
                <li key={childIndex}>
                  <a
                    href={child.Url.replace('{URL_BASE}', '')}
                    className={styles['dropdown-item']}
                  >
                    {child.Title}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    return (
      <li key={index} className={styles['nav-item']}>
        <a href={item.Url} className={styles['nav-link']}>
          {item.Title}
        </a>
      </li>
    );
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles['nav-container']}>
        <button
          className={styles['mobile-menu-toggle']}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul className={`${styles['nav-list']} ${mobileMenuOpen ? styles.open : ''}`}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
