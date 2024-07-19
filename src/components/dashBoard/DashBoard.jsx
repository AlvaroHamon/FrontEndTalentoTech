import axios from "axios";
import { useEffect, useState } from "react";
const URLUSER = `https://backendtalentotech.onrender.com/api/auth/user`;
// const URLUSER = `http://localhost:5000/api/auth/user`;

const DashBoard = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const mostrarUsuario = async () => {
      try {
        const response = await axios.get(URLUSER, { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.log("no se pudo mostrar el usuario");
      }
    };
    mostrarUsuario();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {usuario ? <p>Bienvenido, {usuario.usuario}</p> : <p>Cargando...</p>}
    </div>
  );
};

export default DashBoard;
