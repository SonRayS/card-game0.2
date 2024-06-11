import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useEffect, useState } from "react";
import { addRank } from "../Api/SaveListPlayer";
import { useNameContext } from "../context/useUser.ts";
import { getPlayerName } from "../LocalStorage/LocalStorage.js";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, pairsCount, hasCounter }) {
  const { setName } = useNameContext();
  const [isOpen, setIsOpen] = useState(false);

  const title = isWon ? "You win!" : "You loss!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const time = Number(gameDurationMinutes / 60 + gameDurationSeconds);

  const givingRules = isWon && pairsCount === 9;

  const achievements = [];

  givingRules ? achievements.push("1") : achievements.push("");

  givingRules && hasCounter !== true ? achievements.push("2") : achievements.push("");

  const [newTask, setNewTask] = useState({
    name: getPlayerName(),
    time,
    achievements,
  });

  const condition = !newTask.name;

  const handleFromSubmit = async e => {
    e.preventDefault();
    const result = {
      ...newTask,
    };

    if (givingRules && condition) {
      setIsOpen(false);
      alert("Enter your nickname");
    } else if (givingRules && !condition) {
      await addRank(result).catch(error => {
        console.log(error.message);
      });
      setIsOpen(true);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  useEffect(
    function setUserName() {
      if (condition) {
        setName(true);
        setIsOpen(false);
      } else if (givingRules && !condition) {
        setName(false);
        setIsOpen(false);
      } else {
        setName(false);
        setIsOpen(true);
      }
    },
    [isWon, newTask.name, setName, condition, givingRules],
  );

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {givingRules && (
        <input
          placeholder="Name:"
          name="name"
          className={styles.inputName}
          value={newTask.name || ""}
          onChange={handleInputChange}
        ></input>
      )}
      <p className={styles.description}>Time:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0") + "." + gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      <div>
        {!isWon && isOpen && <Button onClick={onClick}>Start</Button>}

        {!isOpen && givingRules && (
          <div onClick={handleFromSubmit}>
            <button className={styles.btnSave}>Save</button>
          </div>
        )}

        {isWon && isOpen && <Button onClick={onClick}>Start</Button>}
      </div>
      <Link to={`/leaderBoard`} className={styles.leaderBoard}>
        Go to leaderBoard
      </Link>
    </div>
  );
}
