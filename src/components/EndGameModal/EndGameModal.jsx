import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { addRank } from "../Api/SaveListPlayer";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? "You win!" : "You loss!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const time =
    gameDurationMinutes.toString().padStart("2", "0") / 60 + gameDurationSeconds.toString().padStart("2", "0");

  const [newTask, setNewTask] = useState({
    name: "",
    time,
  });

  const handleFromSubmit = async e => {
    e.preventDefault();
    const result = {
      ...newTask,
    };

    if (isWon === true && newTask.name === "") {
      alert("Введите ваш никнейм");
    } else if (isWon === true && newTask.name !== "") {
      await addRank(result).catch(error => {
        console.log(error.message);
      });
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение target = DOM element

    setNewTask({
      ...newTask, // Копируем текущие данные из состояния
      [name]: value, // Обновляем нужное поле
    });
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isWon ? (
        <input
          placeholder="Name:"
          name="name"
          className={styles.inputName}
          value={newTask.name}
          onChange={handleInputChange}
        ></input>
      ) : (
        console.log(/* "you loss" */)
      )}
      <p className={styles.description}>Time:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0") + "." + gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={(() => handleFromSubmit, onClick)}>Start</Button>
      <Link to={`/leaderBoard`} className={styles.leaderBoard}>
        Go to leaderboard
      </Link>
    </div>
  );
}
