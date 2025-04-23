import { FormEvent, useState } from "react";
import { Input } from "../Input/Input";
import styles from "./Form.module.css";
import { Button } from "../Button/Button";
import { formSchema } from "../../schemas/formSchema";
import Swal from "sweetalert2";

export const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPass: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await formSchema.validate(values, { abortEarly: false });

      Swal.fire({
        icon: "success",
        title: "Formulario enviado correctamente",
        confirmButtonText: "Aceptar",
      });
      setErrors({});
      setValues({
        name: "",
        email: "",
        password: "",
        repeatPass: "",
      });
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  const hasErrors = Object.keys(errors).length > 0;

  const handleInputChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = async (name: string, value: string) => {
    try {
      await formSchema.validateAt(name, { ...values, [name]: value });
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  return (
    <div className={styles.containerForm}>
      <h3>Formulario Manejo de errores</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Nombre:"
          name="name"
          type="text"
          value={values.name}
          onChange={handleInputChange}
          error={errors.name}
        />

        <Input
          label="Correo:"
          name="email"
          type="email"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />

        <Input
          label="Contraseña:"
          name="password"
          type="password"
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />

        <Input
          label="Confirmar Contraseña:"
          name="repeatPass"
          type="password"
          value={values.repeatPass}
          onChange={handleInputChange}
          error={errors.repeatPass}
        />

        <Button disabled={hasErrors} />
      </form>
    </div>
  );
};
