import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";
import { useEffect, useState } from "react";
import imgCliente from "../../assets/clientesrm.png";
import imgProveedor from "../../assets/proveedoresrm.png";
import Swal from "sweetalert2";
const URLUSER = `auth/user`;

const DashBoard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    mostrarUsuario();
  }, []);

  const mostrarUsuario = async () => {
    try {
      const response = await axios.get(URLUSER);
      setUsuario(response.data);
      setLogin(true);
    } catch (error) {
      Swal.fire({
        title: "Debe iniciar sesión",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    login && (
      <div className="container-fluid mt-4" style={{ flex: 1 }}>
        {usuario ? <h1>Bienvenido, {usuario.usuario}</h1> : <p>Cargando...</p>}
        <div className="row mt-4">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <h5 className="card-title text-center">Clientes</h5>
              <Link to="/clientes">
                <img
                  src={imgCliente}
                  className="card-img-top"
                  alt="imagen de cliente"
                />
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <h5 className="card-title text-center">Proveedores</h5>
              <Link to="/proveedores">
                <img
                  src={imgProveedor}
                  className="card-img-top"
                  alt="imagen de proveedor"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DashBoard;
