import styles from "./AppHeader.module.css";
import FischLogo from "../../public/fischLogo";
import AddNewButton from "../../public/addNewButton";

interface HeaderProps {
  cardsAmt: Number;
}

export const AppHeader = (props: HeaderProps) => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <FischLogo />
    </div>
    <div className={styles.textWrap}>
      <span className={styles.text}>
        Cards amount: {props.cardsAmt.toString()}
      </span>
    </div>
    <button className={styles.button}>
      <AddNewButton />
    </button>
  </header>
);
