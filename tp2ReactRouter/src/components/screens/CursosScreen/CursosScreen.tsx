import { CursoCard } from "../../ui/CursoCard/CursoCard";
import styles from "./CursosScreen.module.css";

export const CursosScreen = () => {
  return (
    <div className={styles.containerCurso}>
      <h3 className={styles.tituloCurso}>Cursos Disponibles</h3>

      <div>
        <CursoCard />
      </div>
    </div>
  );
};
