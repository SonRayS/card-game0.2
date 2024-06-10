import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [difficulty, setDifficulty] = useState(3);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Select Difficulty</h1>
        <ul className={styles.levels}>
          <Link
            onClick={() => setDifficulty(3)}
            className={difficulty === 3 ? styles.levelLinkSelected : styles.levelLink}
          >
            <li className={styles.level}> 1 </li>
          </Link>

          <Link
            onClick={() => setDifficulty(6)}
            className={difficulty === 6 ? styles.levelLinkSelected : styles.levelLink}
          >
            <li className={styles.level}>2</li>
          </Link>

          <Link
            onClick={() => setDifficulty(9)}
            className={difficulty === 9 ? styles.levelLinkSelected : styles.levelLink}
          >
            <li className={styles.level}>3 </li>
          </Link>
        </ul>

        <div className={styles.checkBox}>
          <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          easy mod
        </div>
        <Link to={`/game/${difficulty}/${isChecked}`} className={styles.buttonStart}>
          Старт
        </Link>
        <Link to={`/leaderBoard`} className={styles.leaderBoard}>
          Leaderboard
        </Link>
      </div>
    </div>
  );
}
