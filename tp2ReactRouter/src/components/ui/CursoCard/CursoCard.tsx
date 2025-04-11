import { useEffect, useState } from "react";
import { ICurso } from "../../../types/ICurso";
import { getCursos } from "../../../http/api";
import styles from "./CursoCard.module.css";
import { useNavigate } from "react-router";

export const CursoCard = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]); //Estado para manejar los cursos
  const navigate = useNavigate(); //Intanciamos Navigate

  //Funcion para obtener todos los cursos
  const getAllCursos = async () => {
    const cursos = await getCursos();
    if (cursos) {
      //Si cursos existe los mandamos al estado
      setCursos(cursos);
    }
  };

  //Al montar el componente, llamamos a la funcion
  useEffect(() => {
    getAllCursos();
  }, []);

  return (
    <div className={styles.containerCardCurso}>
      {cursos.length > 0 ? (
        cursos.map((curso) => (
          <div className={styles.cardCurso}>
            <div className={styles.infoCardCurso}>
              <p>
                <b>Nombre del curso:</b> {curso.nombre}
              </p>
              <p>
                <b>Cantidad de alumnos:</b> {curso.estudiantes.length}
              </p>
            </div>

            <div className={styles.containerButtonCardCurso}>
              <button
                className={styles.button}
                onClick={() => navigate(`/estudiantes?cursoId=${curso.id}`)} // Navegamos hacia la pantalla de estudiantes, pasando el ID del curso en la URL
              >
                Entrar al curso
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay cursos disponibles</p>
      )}
    </div>
  );
};
