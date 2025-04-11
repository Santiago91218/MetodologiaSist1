import axios from "axios";
import { ICurso } from "../types/ICurso";

//Endpoint del json-server
const API_URL = "http://localhost:3000/cursos";

//Funcion para obtener todos los cursos
export const getCursos = async () => {
  try {
    const response = axios.get<ICurso[]>(API_URL); //Hacemos una peticion GET para obtener los cursos
    return (await response).data; // Retornamos los cursos
  } catch (err) {
    console.log(err); //Si ocurrio un error mostramos el mensaje
  }
};

//Funcion para obtener los estudiantes de un curso
export const getEstudiantesPorCurso = async (idCurso: string) => {
  try {
    const cursos = await getCursos(); //Obtenemos todos los cursos
    const cursoSeleccionado = cursos?.find((c) => c.id === idCurso); //Buscamos el que coincida con el id que nos mandan

    if (cursoSeleccionado) {
      //Si encontramos el curso
      return cursoSeleccionado.estudiantes; //Retornamos los estudiantes de ese curso
    } else {
      return []; //Si no retornamos un array vacio
    }
  } catch (err) {
    console.error(err); //Si ocurrio un error mostramos el mensaje
    return []; // Retormanos un array vacio
  }
};
