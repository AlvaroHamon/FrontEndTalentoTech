import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CrearClientes from "./components/cliente/CrearClientes";
import MostrarClientes from "./components/cliente/MostrarClientes";
import ActualizarCliente from "./components/cliente/ActualizarCliente";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MostrarProveedores from "./components/proveedor/MostrarProveedores";
import ActualizarProveedor from "./components/proveedor/ActualizarProveedor";
import CrearProveedor from "./components/proveedor/CrearProveedor";
import Login from "./components/login/Login";
import Registro from "./components/login/Registro";
import DashBoard from "./components/dashBoard/DashBoard";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/clientes" element={<MostrarClientes />} />
          <Route path="/clientes/agregar" element={<CrearClientes />} />
          <Route path="/clientes/editar/:id" element={<ActualizarCliente />} />
          <Route path="/proveedores" element={<MostrarProveedores />} />
          <Route path="/proveedores/agregar" element={<CrearProveedor />} />
          <Route
            path="/proveedores/editar/:id"
            element={<ActualizarProveedor />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
