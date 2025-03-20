import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import CardList from "../CardList/CardList";
import Modal from "../Modal/Modal";
import { ITarea } from "../../../types/ITareas";
import useTareas from "../../../hooks/useTareas";

const ListTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const { getTareas, tareas } = useTareas();

  useEffect(() => {
    getTareas();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);
  const handleOpenModal = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  return (
    <>
      <div className="flex justify-center items-center p-[2rem] flex flex-col gap-[1rem]">
        <div className="flex justify-around gap-[1rem] w-[90%]">
          <h1 className="font-bold text-2xl">Lista de tareas</h1>
          <button
            className="bg-[#19a07e] px-3 py-2 rounded text-white hover:bg-[#158469] cursor-pointer"
            onClick={() => {
              setOpenModalTarea(true);
            }}
          >
            Agregar tarea
          </button>
        </div>
        <div className="flex flex-col items-center gap-[1rem] p-[1rem] bg-[#ccc] w-[70%] min-h-[60vh] max-h-[62vh] overflow-y-auto  rounded-md">
          {tareas.length > 0 ? (
            tareas.map((el) => (
              <CardList handleOpenModal={handleOpenModal} tarea={el} />
            ))
          ) : (
            <div>
              <h1>No hay tareas</h1>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default ListTareas;
