import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import Swal from "sweetalert2";
const URL = `proveedores`;
const URLUSER = `auth/user`;
// const URL = `http://localhost:5000/api/proveedores/`;

const MostrarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    mostrarProveedores();
  }, []);

  //función para mostrar Proveedores
  const mostrarProveedores = async () => {
    try {
      const userLogin = await axios.get(URLUSER);
      if (!userLogin.status !== 200) {
        const datos = await axios.get(URL);
        setProveedores(datos.data);
      }
    } catch (error) {
      console.log(`No se pudieron cargar los datos: ${error}`);
    }
  };

  //función para eliminar Proveedores
  const eliminarProveedores = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      Swal.fire({
        title: "El proveedor ha sido borrado con exito",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mostrarProveedores();
    } catch (error) {
      Swal.fire({
        title:
          "Hubo un problema al eliminar el proveedor. Inténtalo de nuevo más tarde.",
        icon: "warning",
      });
      console.log(`Hubo un error al tratar de eliminar el proveedor ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Lista de Proveedores</h2>
          <Link to="/proveedores/agregar" className="btn btn-primary">
            <i className="fa-solid fa-plus"></i>
          </Link>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Razón social</th>
                  <th>Nit</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.razonSocial}</td>
                      <td>{item.nit}</td>
                      <td>{item.correo}</td>
                      <td>{item.contacto}</td>
                      <td>{item.direccion}</td>
                      <td>
                        <Link
                          to={`/Proveedores/editar/${item._id}`}
                          className="btn btn-primary mt-2 mb-2"
                          aria-label="Editar Cliente"
                        >
                          <i className="fa-solid fa-pen-to-square" />
                        </Link>
                        <button
                          onClick={() => {
                            eliminarProveedores(item._id);
                          }}
                          className="btn btn-danger mt-2 mb-2"
                          aria-label="Eliminar cliente"
                        >
                          <i className="fa-solid fa-trash"></i>
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

export default MostrarProveedores;
