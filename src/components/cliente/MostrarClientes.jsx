import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import Swal from "sweetalert2";

const URLUSER = `auth/user`;
const URL = `clientes`;

const MostrarClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    mostrarClientes();
  }, []);

  const mostrarClientes = async () => {
    try {
      const userLogin = await axios.get(URLUSER);
      if (userLogin.status !== 200) {
        navigate("/");
      } else {
        const datos = await axios.get(URL, { withCredentials: true });
        setClientes(datos.data);
      }
    } catch (error) {
      console.log("Hubo un error al obtener los datos de los clientes", error);
      navigate("/");
    }
  };
  //función para eliminar clientes
  const eliminarClientes = async (id) => {
    try {
      await axios.delete(`${URL}${id}`, { withCredentials: true });
      Swal.fire({
        title: "El cliente ha sido borrado con éxito",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mostrarClientes();
    } catch (error) {
      Swal.fire({
        title:
          "Hubo un problema al eliminar el cliente. Inténtalo de nuevo más tarde.",
        icon: "warning",
      });
      console.log(`Hubo un error al tratar de eliminar el cliente ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Lista de Clientes</h2>
          <Link to="/clientes/agregar" className="btn btn-primary">
            <i className="fa-solid fa-plus"></i>
          </Link>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Nit</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.nombres}</td>
                      <td>{item.apellidos}</td>
                      <td>{item.cedula}</td>
                      <td>{item.correo}</td>
                      <td>{item.numeroContacto}</td>
                      <td>{item.nit}</td>
                      <td>{item.direccion}</td>
                      <td>
                        <Link
                          to={`/clientes/editar/${item._id}`}
                          className="btn btn-primary mt-2 mb-2"
                          aria-label="Editar Cliente"
                        >
                          <i className="fa-solid fa-pen-to-square" />
                        </Link>
                        <button
                          onClick={() => {
                            eliminarClientes(item._id);
                          }}
                          className="btn btn-danger"
                          aria-label="Eliminar cliente"
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostrarClientes;
