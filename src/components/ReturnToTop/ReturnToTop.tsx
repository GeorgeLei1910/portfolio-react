import React, { FC, useState, useEffect } from 'react';
import styles from './ReturnToTop.module.css';

interface ReturnToTopProps {
  type: string;
}

const ReturnToTop: FC<ReturnToTopProps> = ({type}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
        setIsVisible((window.pageYOffset > 300));
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className={`${styles.returnToTop} ${type}`}
          onClick={scrollToTop}
          name='Return to Top'
          aria-label="Return to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ReturnToTop;

