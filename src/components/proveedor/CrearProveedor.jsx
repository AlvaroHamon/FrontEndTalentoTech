import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CrearProveedor = () => {
  const navigate = useNavigate();
  const URL = `http://localhost:5000/api/proveedores/`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(URL, data, { withCredentials: true });
      Swal.fire({
        icon: "success",
        title: "Proveedor creado",
        text: "El proveedor se ha creado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/proveedores");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el proveedor. Inténtalo de nuevo más tarde.",
      });
      console.error("Error:", error);
    }
  };
  return (
    <div className="container">
      <div className="col">
        <h2>Crear Nuevo Proveedor</h2>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="razonSocial" className="form-label">
              Razón Social
            </label>
            <input
              id="razonSocial"
              className="form-control"
              aria-describedby="razonSocialHelp"
              {...register("razonSocial", { required: true })}
            />
            {errors.razonSocial && (
              <span id="razonSocialHelp" className="text-danger">
                Ingrese un nombre de razón social
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="nit" className="form-label">
              Nit
            </label>
            <input
              id="nit"
              aria-describedby="nitHelp"
              type="number"
              className="form-control"
              {...register("nit", { required: true })}
            />
            {errors.nit && (
              <span id="nitHelp" className="text-danger">
                Ingrese un numero de NIT
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="correo"
              aria-describedby="correoHelp"
              className="form-control"
              {...register("correo", {
                required: true,
                pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.correo && (
              <span id="correoHelp" className="text-danger">
                Por favor ingresa un correo válido
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="contacto" className="form-label">
              Numero de Teléfono
            </label>
            <input
              id="contacto"
              aria-describedby="contactoHelp"
              type="number"
              className="form-control"
              {...register("contacto", { required: true })}
            />
            {errors.contacto && (
              <span id="contactoHelp" className="text-danger">
                Ingrese el numero telefónico
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <input
              id="direccion"
              aria-describedby="direccionHelp"
              className="form-control"
              {...register("direccion", { required: true })}
            />
            {errors.direccion && (
              <span id="direccionHelp" className="text-danger">
                Por favor ingrese una Dirección
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Crear Proveedor
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearProveedor;
