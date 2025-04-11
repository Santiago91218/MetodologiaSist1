import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getEstudiantesPorCurso } from "../../../http/api";
import { IEstudiante } from "../../../types/IEstudiante";
import { EstudianteCard } from "../../ui/EstudianteCard/EstudianteCard";
import styles from "./EstudiantesScreen.module.css";

export const EstudiantesScreen = () => {
  //Leemos query param
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get("cursoId"); //Obtenemos el id del curso desde la URL
  const navigate = useNavigate(); //Instanciamos Navigate
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]); //Estado para manejar los estudiantes

  //Funcion para buscar los estdaintes del curso
  const buscarEstudiantes = async () => {
    //Si no tenemos el id del curso, no buscamos estudiantes
    if (!cursoId) {
      return <p>Debes seleccionar un curso</p>;
    }
    //Obtenemos los estudiantes del curso
    const data = await getEstudiantesPorCurso(cursoId);
    setEstudiantes(data); //Los guardamos en el estado
  };

  //Al montar el componente, llamamos a la funcion
  useEffect(() => {
    buscarEstudiantes();
  }, []);

  return (
    <div className={styles.containerEstudiantes}>
      <div className={styles.containerTitle}>
        <h3>Estudiantes del curso: </h3>
        <button
          onClick={() => {
            navigate(-1); //Volvemos a la pantalla anterior
          }}
        >
          Volver
        </button>
      </div>

      <div className={styles.containerCardEstudiante}>
        <EstudianteCard estudiantes={estudiantes} />
      </div>
    </div>
  );
};
