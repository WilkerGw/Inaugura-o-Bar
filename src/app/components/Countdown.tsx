// src/app/components/Countdown.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-12-31T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className={styles.timeBlock}>
        <div className={styles.timeValue}>{timeLeft[interval as keyof typeof timeLeft]}</div>
        <div className={styles.timeInterval}>{interval}</div>
      </div>
    );
  });

  return (
    <div className={styles.countdownContainer}>
      {timerComponents.length ? timerComponents : <span>A contagem regressiva terminou!</span>}
    </div>
  );
};

export default Countdown;