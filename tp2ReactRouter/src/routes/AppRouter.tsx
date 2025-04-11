import { Navigate, Route, Routes } from "react-router";
import { CursosScreen } from "../components/screens/CursosScreen/CursosScreen";
import { EstudiantesScreen } from "../components/screens/EstudiantesScreen/EstudiantesScreen";

export const AppRouter = () => {
  return (
    //Definimos las rutas de nustro proyecto
    <Routes>
      <Route path="/" element={<Navigate to={"/cursos"} />} />
      <Route path="/cursos" element={<CursosScreen />} />
      <Route path="/estudiantes" element={<EstudiantesScreen />} />
    </Routes>
  );
};
