import styles from "./label.module.css";

export default function Label ({ name, id, val, check, setCheck}) {
  return (
    <div className={styles.label}>
      <label className={styles.text} htmlFor={id}>{val}</label>
      <input
        onChange={(event) => setCheck(event.target.value)}
        className={styles.input}
        type="radio"
        name={name}
        id={id}
        value={val}
        checked={check==val}
      />
    </div>
  );
}
