import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const URL = `https://backendtalentotech.onrender.com/api/clientes/`;
// const URL = `http://localhost:5000/api/clientes/`;

const ActualizarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    numeroContacto: "",
    nit: "",
    direccion: "",
  });

  useEffect(() => {
    mostrarCliente();
  }, [id]);

  const mostrarCliente = async () => {
    try {
      const datos = await axios.get(`${URL}${id}`, { withCredentials: true });
      setCliente(datos.data);
    } catch (error) {
      console.log(`no se pudo modificar el Cliente`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Desea confirmar los datos?",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "Cancelar",
      }).then(async (resultado) => {
        if (resultado.isConfirmed) {
          try {
            await axios.put(`${URL}${id}`, cliente, { withCredentials: true });
            Swal.fire({
              title: "Cliente actualizado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              navigate("/clientes");
            }, 2000);
          } catch (error) {
            Swal.fire({
              title: "Ocurrió un error al Actualizar el cliente",
              text: "Por favor intente nuevamente mas tarde",
              icon: "error",
            });
            console.log("ocuarrio un error al actualizar: " + error);
          }
        } else {
          Swal.fire("Cambios no guardados", "", "error");
        }
      });
    } catch (error) {
      console.log("No se pudo actualizar el cliente: " + error);
    }
  };

  return (
    <div className="container">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <h2>Modificar usuario</h2>
          <div className="mb-3">
            <label htmlFor="nombres" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="nombres"
              value={cliente.nombres}
              onChange={(evento) => {
                setCliente((previo) => ({
                  ...previo,
                  nombres: evento.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidos"
              value={cliente.apellidos}
              onChange={(e) => {
                setCliente((previo) => ({
                  ...previo,
                  apellidos: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cedula" className="form-label">
              Documento
            </label>
            <input
              type="number"
              className="form-control"
              id="cedula"
              value={cliente.cedula}
              onChange={(e) => {
                setCliente((previo) => ({
                  ...previo,
                  cedula: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              value={cliente.correo}
              onChange={(e) => {
                setCliente((previo) => ({
                  ...previo,
                  correo: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numeroContacto" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="numeroContacto"
              value={cliente.numeroContacto}
              onChange={(e) => {
                setCliente((previo) => ({
                  ...previo,
                  numeroContacto: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nit" className="form-label">
              Nit
            </label>
            <input
              type="number"
              className="form-control"
              id="nit"
              value={cliente.nit}
              onChange={(e) => {
                setCliente((previo) => ({ ...previo, nit: e.target.value }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dirección" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="dirección"
              value={cliente.direccion}
              onChange={(e) => {
                setCliente((previo) => ({
                  ...previo,
                  direccion: e.target.value,
                }));
              }}
            />
          </div>
          <button type={"submit"} className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarCliente;
