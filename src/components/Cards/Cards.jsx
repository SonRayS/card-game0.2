import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
// Идет start
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";
// Идет spause
const STATUS_PAUSED = "STATUS_PAUSED";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, hasCounter = false, previewSeconds = 5 }) {
  // Кол-во хп
  let [lives, setLives] = useState(3);
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);
  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);
  // Открыть карты
  const [cardsOpen, setCardsOpen] = useState(null);
  // cost open card
  const [costCardsOpen, setCostCardsOpen] = useState(1);
  //  cost open two card
  const [twoCardsOpen, setTwoCardsOpen] = useState(1);
  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
  }
  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setLives(3);
    setCostCardsOpen(1);
    setTwoCardsOpen(1);
    setStatus(STATUS_PREVIEW);
  }

  /*
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    const playerLost = openCardsWithoutPair.length >= 2;

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары
    if (playerLost) {
      if (hasCounter && lives > 1) {
        setLives(lives - 1);
        setTimeout(() => {
          // Игровое поле: закрываем неверную карту обратно.
          const nextCards = cards.map(card => {
            const isOpen = openCardsWithoutPair.indexOf(card) > -1 ? false : card.open;
            return {
              ...card,
              open: isOpen,
            };
          });

          setCards(nextCards);
        }, 700);

        return;
      } else {
        finishGame(STATUS_LOST);
        return;
      }
    }

    // ... игра продолжается
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  useEffect(() => {
    if (status !== STATUS_PAUSED) {
      const intervalId = setInterval(() => {
        setTimer(t => ({
          ...t,
          seconds: t.seconds + 1,
        }));
      }, 1000);
      return status === STATUS_WON
        ? clearInterval(intervalId)
        : () => {
            clearInterval(intervalId);
          };
    }
  }, [gameStartDate, gameEndDate, status, timer]);
  /* ---------------------------------------- Открыть все карты на 5 сек ---------------------------------------- */
  const isOpenCards = () => {
    const currentTime = timer;
    setStatus(STATUS_PAUSED);
    setCostCardsOpen("");
    setCardsOpen(true);
    setTimeout(() => {
      setCardsOpen(false);
      setTimer(currentTime);
      setStatus(STATUS_IN_PROGRESS);
    }, 5000);
  };

  /* ---------------------------------------- Открыть все карты на 5 сек ---------------------------------------- */
  /* ---------------------------------------- Открыть 2 карты ------------------------------------------------- */
  const isOpenTwoCards = () => {
    if (!cardsOpen) {
      setTwoCardsOpen("");
      const randomNumber = Math.floor(Math.random() * (pairsCount * 2));
      cards[randomNumber].open = true;
      const firstCard = cards[randomNumber];
      // eslint-disable-next-line array-callback-return
      const twoCards = cards.find(function (el) {
        if (el.rank === firstCard.rank && el.suit === firstCard.suit && el.open !== firstCard.open) {
          return el;
        }
      });
      twoCards.open = true;
    }
  };
  /* ---------------------------------------- Открыть 2 карты ------------------------------------------------- */
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS || status === STATUS_PAUSED ? (
          <Button onClick={resetGame}>Restart</Button>
        ) : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : cardsOpen || card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
            pairsCount={pairsCount}
            hasCounter={hasCounter}
          />
        </div>
      ) : null}
      {(hasCounter === true && status === STATUS_IN_PROGRESS) || status === STATUS_PAUSED ? (
        <div className={styles.heartsContainer}>
          <button className={styles.openTwoCard} onClick={isOpenTwoCards} disabled={!twoCardsOpen}>
            <p>{twoCardsOpen}</p>
          </button>
          <button className={styles.costHearts} id="id1">
            <p>{lives}</p>
          </button>
          <button className={styles.openCards} onClick={isOpenCards} disabled={!costCardsOpen}>
            <p>{costCardsOpen}</p>
          </button>
        </div>
      ) : null}
    </div>
  );
}
