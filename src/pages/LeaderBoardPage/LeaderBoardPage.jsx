import { Link } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import { LeaderBoard } from "../../components/LeaderBoard/LeaderBoard.js";
import { getListPlayer } from "../../components/Api/GetListPlayer";
import { useListContext } from "../../components/context/useUser.ts";

export function LeaderBoardPage() {
  const { list, setList } = useListContext();
  getListPlayer().then(response => {
    setList(response.leaders);
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Лидерборд</div>
          <Link to={`/`} className={styles.buttonStart}>
            Начать игру
          </Link>
        </div>
        <LeaderBoard PlayerList={list} />
      </div>
    </>
  );
}
