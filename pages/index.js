import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const messages = {
  "0,0": "Message for square (0,0)",
  "1,2": "Message for square (1,2)",
  "-2,-3": "Message for square (-2,-3)",
  "5,5": "Message for 5,5"
  // Add more messages as needed, using the format "col,row": "message"
};

export default function Home() {
  const coordinatePlaneRef = useRef(null);
  const circleRef = useRef(null);
  const [currentSquare, setCurrentSquare] = useState("0,0");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const coordinatePlane = coordinatePlaneRef.current;
    const circle = circleRef.current;
    const squareSize = 300 / 11;

    const startDragging = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const drag = (e) => {
      if (!isDragging) return;
      const coordinatePlaneRect = coordinatePlane.getBoundingClientRect();
      const x = e.clientX - coordinatePlaneRect.left;
      const y = e.clientY - coordinatePlaneRect.top;
      const col = Math.floor(x / squareSize) - 5;
      const row = 5 - Math.floor(y / squareSize);

      if (col < -5 || col > 5 || row < -5 || row > 5) return;

      setCurrentSquare(`${col},${row}`);
      setCirclePosition(col, row);
    };

    const stopDragging = () => {
      setIsDragging(false);
    };

    const moveWithArrowKeys = (e) => {
      const [currentCol, currentRow] = currentSquare.split(",").map(Number);

      let newCol = currentCol;
      let newRow = currentRow;

      switch (e.key) {
        case 'ArrowUp':
          if (currentRow < 5) newRow = currentRow + 1;
          break;
        case 'ArrowDown':
          if (currentRow > -5) newRow = currentRow - 1;
          break;
        case 'ArrowLeft':
          if (currentCol > -5) newCol = currentCol - 1;
          break;
        case 'ArrowRight':
          if (currentCol < 5) newCol = currentCol + 1;
          break;
        default:
          return;
      }

      setCurrentSquare(`${newCol},${newRow}`);
      setCirclePosition(newCol, newRow);
    };

    const moveWithClick = (e) => {
      const coordinatePlaneRect = coordinatePlane.getBoundingClientRect();
      const x = e.clientX - coordinatePlaneRect.left;
      const y = e.clientY - coordinatePlaneRect.top;
      const col = Math.floor(x / squareSize) - 5;
      const row = 5 - Math.floor(y / squareSize);

      if (col < -5 || col > 5 || row < -5 || row > 5) return;

      setCurrentSquare(`${col},${row}`);
      setCirclePosition(col, row);
    };

    const setCirclePosition = (col, row) => {
      circle.style.transform = `translate(${(col + 5) * squareSize + squareSize / 2 - circle.offsetWidth / 2}px, ${(5 - row) * squareSize + squareSize / 2 - circle.offsetHeight / 2}px)`;
    };

    circle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('keydown', moveWithArrowKeys);
    coordinatePlane.addEventListener('click', moveWithClick);

    return () => {
      circle.removeEventListener('mousedown', startDragging);
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('keydown', moveWithArrowKeys);
      coordinatePlane.removeEventListener('click', moveWithClick);
    };
  }, [currentSquare, isDragging]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coordinate Plane</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className={styles.main}>
        <div className={styles.messageDisplayContainer}>
          <div className={styles.messageDisplay}>{messages[currentSquare] || ""}</div>
        </div>
        <div className={styles.coordinatePlaneContainer}>
          <div className={styles.coordinatePlane} ref={coordinatePlaneRef}>
            {Array.from({ length: 121 }, (_, i) => (
              <div key={i} className={styles.square}></div>
            ))}
            <div className={styles.circle} ref={circleRef}></div>
            <div className={styles.arrowX}></div>
            <div className={styles.arrowY}></div>
            <div className={`${styles.label} ${styles['label-top']}`}>More Ominous</div>
            <div className={`${styles.label} ${styles['label-bottom']}`}>More Auspicious</div>
            <div className={`${styles.label} ${styles['label-left']}`}>More Literal</div>
            <div className={`${styles.label} ${styles['label-right']}`}>More Metaphorical</div>
          </div>
        </div>
      </main>
    </div>
  );
} 