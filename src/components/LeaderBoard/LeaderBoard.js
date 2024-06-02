import style from "./LeaderBoard.module.css";

export function LeaderBoard({ PlayerList }) {
  return (
    <div className={style.board}>
      <div className={style.board_header}>
        <div className={style.position}>Позиция</div>
        <div className={style.name}>Пользователь</div>
        <div className={style.time}>Время</div>
      </div>

      {PlayerList.map(el => (
        <div className={style.board_item} key={el.id}>
          <div className={style.position}>{el.id} </div>
          <div className={style.name}>{el.name}</div>
          <div className={style.time}>{el.time}</div>
        </div>
      ))}
    </div>
  );
}
