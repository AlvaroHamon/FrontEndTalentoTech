import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
// const URL = "https://backendtalentotech.onrender.com/api/auth/";
const URL = "http://localhost:5000/api/auth/";

const Login = () => {
  const [usuario, setUsuario] = useState({
    usuario: "",
    password: "",
  });

  const [error, setError] = useState({
    usuario: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newError = { usuario: "", password: "" };

    // Validación de usuario
    if (usuario.usuario === "") {
      newError.usuario = "Ingrese un usuario valido";
      isValid = false;
    }

    // Validación de password
    if (usuario.password === "") {
      newError.password = "Password no puede estar vacío";
      isValid = false;
    }

    setError(newError);
    if (isValid) {
      await axios.post(`${URL}login`, usuario, {
        withCredentials: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="col">
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario
            </label>
            <input
              className="form-control"
              id="usuario"
              aria-describedby="emailHelp"
              value={usuario.usuario}
              onChange={(e) =>
                setUsuario({ ...usuario, usuario: e.target.value })
              }
            />
            {error.usuario && (
              <span className="text-danger">{error.usuario}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
              value={usuario.password}
              onChange={(e) =>
                setUsuario({ ...usuario, password: e.target.value })
              }
            />
            {error.password && (
              <span className="text-danger">{error.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
          <div className="mt-3">
            <span>
              ¿No tienes cuenta?, <Link to="/register">Regístrate</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
