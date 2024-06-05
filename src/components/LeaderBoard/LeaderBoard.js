import style from "./LeaderBoard.module.css";

export function LeaderBoard({ PlayerList }) {
  // eslint-disable-next-line array-callback-return
  const arrPlayer = PlayerList.sort(function (a, b) {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
  }).slice(0, 10);

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
