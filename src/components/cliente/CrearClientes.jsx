import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const URL = `https://backendtalentotech.onrender.com/api/clientes/`;
// const URL = `http://localhost:5000/api/clientes/`;

const CrearClientes = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const crearCliente = async (cliente) => {
    try {
      await axios.post(URL, cliente, { withCredentials: true });
      Swal.fire({
        title: "Cliente creado con éxito",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "ocurrió un error al crear el usuario",
        icon: "error",
        text: "Por favor, intente nuevamente mas tarde",
      });
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="col">
        <h2>Crear Cliente</h2>
        <form className="mt-4" onSubmit={handleSubmit(crearCliente)}>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">
              Nombres
            </label>
            <input
              id="nombres"
              className="form-control"
              aria-describedby="nombresHelp"
              {...register("nombres", { required: true })}
            />
            {errors.nombres && (
              <span className="text-danger" id="nombresHelp">
                El campo Nombres no puede estar vacio
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              className="form-control"
              id="apellidos"
              aria-describedby="apellidosHelp"
              {...register("apellidos", { required: true })}
            />
            {errors.apellidos && (
              <span className="text-danger" id="apellidosHelp">
                El campo Apellidos no puede estar vació
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="cedula" className="form-label">
              Cédula
            </label>
            <input
              type="number"
              className="form-control"
              id="cedula"
              aria-describedby="cedulaHelp"
              {...register("cedula", { required: true })}
            />
            {errors.cedula && (
              <span className="text-danger" id="cedulaHelp">
                El campo cedula no puede estar vació
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              className="form-control"
              id="correo"
              aria-describedby="correoHelp"
              {...register("correo", {
                required: true,
                pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.correo && (
              <span id="correoHelp" className="text-danger">
                Ingrese un correo valido
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="numeroContacto" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="numeroContacto"
              aria-describedby="numeroContactoHelp"
              {...register("numeroContacto", { required: true })}
            />
            {errors.numeroContacto && (
              <span id="numeroContactoHelp" className="text-danger">
                El campo Teléfono no puede estar vació
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nit" className="form-label">
              Nit
            </label>
            <input
              type="number"
              className="form-control"
              id="nit"
              aria-describedby="nitHelp"
              {...register("nit", { required: true })}
            />
            {errors.nit && (
              <span className="text-danger" id="nitHelp">
                El campo nit no puede estar vació
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dirección" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="dirección"
              aria-describedby="direccionHelp"
              {...register("direccion", { required: true })}
            />
            {errors.direccion && (
              <span className="text-danger" id="direccionHelp">
                El campo dirección no puede estar vació
              </span>
            )}
          </div>
          <button type={"submit"} className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearClientes;
