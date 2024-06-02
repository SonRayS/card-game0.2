import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { AddRank } from "../Api/SaveListPlayer";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const time =
    gameDurationMinutes.toString().padStart("2", "0") + "." + gameDurationSeconds.toString().padStart("2", "0");

  const [newTask, setNewTask] = useState({
    name: "",
    time,
  });

  const handleFromSubmit = async e => {
    e.preventDefault();
    const result = {
      ...newTask,
    };

    if (result.name === "") {
      result.name = "Пользователь";
    }

    await AddRank(result)
      .then(data => {})
      .catch(error => {
        console.log(error.message);
      });
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
          placeholder="Name :"
          name="name"
          className={styles.inputName}
          value={newTask.name}
          onChange={handleInputChange}
        ></input>
      ) : (
        console.log("err")
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>{time}</div>
      <div className={styles.container} onClick={handleFromSubmit}>
        <Button onClick={onClick}>Начать сначала</Button>
        <Link to={`/leaderBoard`} className={styles.leaderBoard}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
