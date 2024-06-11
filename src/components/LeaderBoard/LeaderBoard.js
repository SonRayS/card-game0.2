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

  function timePlayers({ time }) {
    let m = Math.trunc(time / 60) + "";
    time = (time % 60) + "";
    return m.padStart(2, 0) + ":" + time.padStart(2, 0);
  }

  return (
    <div className={style.board}>
      <div className={style.board_header}>
        <div className={style.position}>
          <img src="top-three.png" alt="" /> Position
        </div>
        <div className={style.name}>
          <img src="user.png" alt="" />
          User
        </div>
        <div className={style.achievements}>
          <img src="badge.png" alt="" />
          Achievements
        </div>
        <div className={style.time}>
          <img src="clock.png" alt="" />
          Time
        </div>
      </div>

      {arrPlayer.map((el, index) => (
        <div className={style.board_item} key={el.id}>
          <div className={style.position}>{index + 1}</div>
          <div className={style.name}>{el.name}</div>
          <div className={style.achievements}>
            {el.achievements[0] === 1 ? (
              <img src="evil.png" alt="" />
            ) : (
              <img src="evil.png" alt="" className={style.achievements__hideImg} />
            )}
            {el.achievements[1] === 2 ? (
              <img src="cool.png" alt="" />
            ) : (
              <img src="cool.png" alt="" className={style.achievements__hideImg} />
            )}
            {el.achievements[2] === 3 ? (
              <img src="hearts.png" alt="" />
            ) : (
              <img src="hearts.png" alt="" className={style.achievements__hideImg} />
            )}
            {el.achievements[3] === 4 ? (
              <img src="running.png" alt="" />
            ) : (
              <img src="running.png" alt="" className={style.achievements__hideImg} />
            )}
          </div>
          <div className={style.time}>{timePlayers({ time: el.time })}</div>
        </div>
      ))}
    </div>
  );
}
