import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/ITareas";
import useTareas from "../../../hooks/useTareas";

type IModal = {
  handleCloseModal: VoidFunction;
};
const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};
const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const { crearTarea, putTareaEditar } = useTareas();

  const [formValues, setFormValues] = useState<ITarea>(initialState);

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tareaActiva) {
      putTareaEditar(formValues);
    } else crearTarea({ ...formValues, id: new Date().toDateString() });
    setTareaActiva(null);
    handleCloseModal();
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] backdrop-blur-sm backdrop-brightness-90">
        <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[35vw] h-[40vh] flex flex-col gap-8 items-center justify-center p-1 rounded ">
          <div>
            <h1 className="text-2xl">
              {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-around gap-1"
          >
            <div>
              <input
                placeholder="Ingrese un titulo"
                type="text"
                required
                onChange={handleChange}
                value={formValues.titulo}
                autoComplete="off"
                name="titulo"
                className="w-[100%] p-[0.5%] m-[0.4rem] border-1 border-gray-500 rounded-[5px]"
              />
              <textarea
                placeholder="Ingrese una descripcion"
                required
                onChange={handleChange}
                value={formValues.descripcion}
                name="descripcion"
                className="w-[100%] p-[0.5%] resize-none m-[0.4rem] border-1 border-gray-500  rounded-[5px]"
              />
              <input
                type="date"
                required
                onChange={handleChange}
                value={formValues.fechaLimite}
                autoComplete="off"
                name="fechaLimite"
                className="w-[100%] p-[0.5%] m-[0.4rem] border-2 border-gray-500 rounded-[5px]"
              />
            </div>
            <div className="flex w-[100%] justify-around">
              <button
                onClick={handleCloseModal}
                className="p-[5px] w-[5vw] bg-[#E42B2B] hover:bg-[#C12626]  rounded-[2px]  cursor-pointer"
              >
                Cancelar
              </button>
              <button
                className="p-[5px] w-[5vw] bg-[#F0F040] hover:bg-[#CECE49] rounded-[2px] cursor-pointer"
                type="submit"
              >
                {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
