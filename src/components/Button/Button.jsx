import styles from "./Button.module.css";
import { useNameContext } from "../context/useUser.ts";

export function Button({ children, onClick }) {
  const { name } = useNameContext();

  return (
    <button onClick={onClick} className={styles.button} disabled={name}>
      {children}
    </button>
  );
}
