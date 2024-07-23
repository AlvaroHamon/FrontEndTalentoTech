import axios from "../../../axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const URL = "auth/";

const Registro = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    usuario: "",
    password: "",
    repPassword: "",
  });
  const [error, setError] = useState({
    usuario: "",
    password: "",
    repPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validar contraseñas
    let passwordError = "";
    if (usuario.password === "" || usuario.repPassword === "") {
      passwordError = "El campo contraseña no puede estar vacío";
      isValid = false;
    } else if (usuario.password.length < 6) {
      passwordError = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    } else if (usuario.password !== usuario.repPassword) {
      passwordError = "Las contraseñas no coinciden";
      isValid = false;
    }

    // Validar usuario
    let usuarioError = "";
    if (usuario.usuario === "") {
      usuarioError = "El usuario no puede estar vacío";
      isValid = false;
    } else if (usuario.usuario.length < 6) {
      usuarioError = "El usuario debe tener al menos 6 caracteres";
      isValid = false;
    }

    // Actualizar estado de errores
    setError({
      usuario: usuarioError,
      password: passwordError,
      repPassword: passwordError,
    });

    if (isValid) {
      try {
        await axios.post(`${URL}register`, usuario);
        Swal.fire({
          icon: "success",
          title: "Usuario Registrado",
          text: "Ya puedes iniciar sesión",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Error de usuario ya existente
          setError({
            ...error,
            usuario: error.response.data.msg || "Error al registrar el usuario",
          });
        } else {
          // Otros errores
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.response?.data?.msg ||
              "Hubo un problema al registrar el usuario",
          });
        }
      }
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
              placeholder="Escriba su nombre de usuario"
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
              placeholder="Ingrese una contraseña"
              value={usuario.password}
              onChange={(e) =>
                setUsuario({ ...usuario, password: e.target.value })
              }
            />
            {error.password && (
              <span className="text-danger">{error.password}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="reppassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="reppassword"
              aria-describedby="reppasswordHelp"
              placeholder="Confirme su contraseña"
              value={usuario.repPassword}
              onChange={(e) =>
                setUsuario({ ...usuario, repPassword: e.target.value })
              }
            />
            {error.repPassword && (
              <span className="text-danger">{error.repPassword}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Cuenta
          </button>
          <div className="mt-3"></div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
