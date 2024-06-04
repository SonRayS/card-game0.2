import style from "./LeaderBoard.module.css";

export function LeaderBoard({ PlayerList }) {
  const arrPlayer = PlayerList.slice(0, 10).sort(function (a, b) {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
  });

  return (
    <div className={style.board}>
      <div className={style.board_header}>
        <div className={style.position}>Позиция</div>
        <div className={style.name}>Пользователь</div>
        <div className={style.time}>Время</div>
      </div>

      {arrPlayer.map((el, index) => (
        <div className={style.board_item} key={el.id}>
          <div className={style.position}>{index + 1}</div>
          <div className={style.name}>{el.name}</div>
          <div className={style.time}>{el.time}</div>
        </div>
      ))}
    </div>
  );
}
