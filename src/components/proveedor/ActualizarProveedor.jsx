import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const URL = `https://backendtalentotech.onrender.com/api/proveedores/`;
// const URL = `http://localhost:5000/api/proveedores/`;

const ActualizarProveedor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    mostrarProveedor();
  }, [id]);

  const mostrarProveedor = async () => {
    try {
      const { data } = await axios.get(`${URL}${id}`, {
        withCredentials: true,
      });
      setValue("razonSocial", data.razonSocial);
      setValue("nit", data.nit);
      setValue("correo", data.correo);
      setValue("contacto", data.contacto);
      setValue("direccion", data.direccion);
    } catch (error) {
      console.log("Error al cargar el Proveedor: " + error);
    }
  };

  const onSubmit = async (datos) => {
    try {
      Swal.fire({
        title: "Desea confirmar los datos?",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "Cancelar",
      }).then(async (resultado) => {
        if (resultado.isConfirmed) {
          try {
            await axios.put(`${URL}${id}`, datos, { withCredentials: true });
            Swal.fire({
              title: "Proveedor actualizado",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            setTimeout(() => {
              navigate("/proveedores");
            }, 2000);
          } catch (error) {
            console.log(`Error al actualizar el proveedor: ${error}`);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al actualizar el proveedor. Inténtalo de nuevo más tarde.",
              icon: "error",
            });
          }
        } else {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    } catch (error) {
      console.log("Hubo un error al actualizar el proveedor: " + error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el proveedor. Inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="razonSocial" className="form-label">
              Razón social
            </label>
            <input
              type="text"
              className="form-control"
              id="razonSocial"
              {...register("razonSocial", { required: true })}
            />
            {errors.razonSocial && (
              <span className="text-danger">
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
              type="number"
              className="form-control"
              {...register("nit", { required: true })}
            />
            {errors.nit && (
              <span className="text-danger">Ingrese un número de NIT</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="correo"
              type="text"
              className="form-control"
              {...register("correo", {
                required: true,
                pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.correo && (
              <span className="text-danger">
                Por favor ingresa un correo válido
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="contacto" className="form-label">
              Teléfono
            </label>
            <input
              id="contacto"
              type="number"
              className="form-control"
              {...register("contacto", { required: true })}
            />
            {errors.contacto && (
              <span className="text-danger">Ingrese el número telefónico</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              className="form-control"
              {...register("direccion", { required: true })}
            />
            {errors.direccion && (
              <span className="text-danger">
                Por favor ingrese una dirección
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarProveedor;
