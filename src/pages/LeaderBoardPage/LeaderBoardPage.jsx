import { Link } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import { LeaderBoard } from "../../components/LeaderBoard/LeaderBoard.js";
import { getListPlayer } from "../../components/Api/GetListPlayer";
import { useListContext } from "../../components/context/useUser.ts";
import { useEffect } from "react";

export function LeaderBoardPage() {
  const { list, setList } = useListContext();

  useEffect(() => {
    getListPlayer().then(response => {
      setList(response.leaders);
    });
  }, [setList]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Leaderboard</div>
          <Link to={`/`} className={styles.buttonStart}>
            Start
          </Link>
        </div>
        <LeaderBoard PlayerList={list} />
      </div>
    </>
  );
}
