import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// const URLUSER = `http://localhost:5000/api/auth/`;
const URLUSER = `https://backendtalentotech.onrender.com/api/auth/`;

const NavBar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const userLogin = async () => {
      try {
        const response = await axios.get(`${URLUSER}user`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setLogin(true);
        }
      } catch (error) {
        console.log("usuario no autenticado");
      }
    };
    userLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${URLUSER}logout`, {}, { withCredentials: true });
      setLogin(false);
      navigate("/");
    } catch (error) {
      console.log("error al cerrar sesion");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand">
            Inicio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav navegacion">
              <li className="nav-item">
                <Link
                  to="/clientes"
                  className="nav-link active"
                  aria-current="page"
                >
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/proveedores" className="nav-link">
                  Proveedores
                </Link>
              </li>
              <li className="nav-item inicioSesion">
                {login ? (
                  <Link onClick={handleLogout} className="nav-link">
                    Cerrar Sesión
                  </Link>
                ) : (
                  <Link to="/" className="nav-link">
                    Iniciar Sesión
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
