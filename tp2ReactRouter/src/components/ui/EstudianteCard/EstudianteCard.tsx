import { FC } from "react";
import { IEstudiante } from "../../../types/IEstudiante";
import styles from "./EstudianteCard.module.css";

interface IProps {
  estudiantes: IEstudiante[];
}

export const EstudianteCard: FC<IProps> = ({ estudiantes }) => {
  return (
    <div className={styles.container}>
      {estudiantes.length > 0 ? (
        estudiantes.map((est) => (
          <div className={styles.containerCard}>
            <div className={styles.containerInfoCard}>
              <p>
                <b>Nombre:</b> {est.nombre}
              </p>
              <p>
                <b>Edad:</b> {est.edad}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay estudiantes en el curso</p>
      )}
    </div>
  );
};
