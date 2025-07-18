import styles from "./button.module.css";

function Button({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      ADD SHIFTS
    </button>
  );
}

export default Button;
