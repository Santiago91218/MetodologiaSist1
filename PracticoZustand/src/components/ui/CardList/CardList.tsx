import { FC } from "react";
import { ITarea } from "../../../types/ITareas";
import useTareas from "../../../hooks/useTareas";

type ICardList = {
  tarea: ITarea;
  handleOpenModal: (tarea: ITarea) => void;
};

const CardList: FC<ICardList> = ({ tarea, handleOpenModal }) => {
  const { eliminarTarea } = useTareas();
  const eliminarTareaById = () => {
    eliminarTarea(tarea.id!);
  };
  const editarTarea = () => {
    handleOpenModal(tarea);
  };
  return (
    <>
      <div className="w-[100%] bg-[#fff] rounded-[0.4rem] p-[0.4rem] flex justify-between bg-[#36c184]">
        <div>
          <h3>
            <b>Titulo:</b> {tarea.titulo}
          </h3>
          <p>
            <b>Descripción:</b> {tarea.descripcion}
          </p>
          <p>
            <b>Fecha Limite:</b> {tarea.fechaLimite}
          </p>
        </div>
        <div className="gap-6 flex mr-[20px] items-center justify-center ">
          <button
            className=" p-[3px]   w-[4vw] h-[4vh]  cursor-pointer rounded bg-[#F0F040] hover:bg-[#CECE49]"
            onClick={editarTarea}
          >
            Editar
          </button>
          <button
            className=" p-[3px] w-[4vw] h-[4vh] cursor-pointer rounded bg-[#E42B2B] hover:bg-[#C12626]"
            onClick={eliminarTareaById}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default CardList;
