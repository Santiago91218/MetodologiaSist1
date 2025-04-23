import { ChangeEvent, FC } from "react";
import styles from "./Input.module.css";

interface IProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export const Input: FC<IProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
