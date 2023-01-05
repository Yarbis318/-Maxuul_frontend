import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Proyectos from "./paginas/Proyectos";
import NuevoProyecto from "./paginas/NuevoProyecto";
import Proyecto from "./paginas/Proyecto";
import EditarProyecto from "./paginas/EditarProyecto";
import NuevoColaborador from "./paginas/NuevoColaborador";
import NuevoColaboradorServicios from "./paginas/NuevoColaboradorServicios";
import Servicios from "./paginas/Servicios"
import NuevoServicio from "./paginas/NuevoServicio";
import Servicio from "./paginas/Servicio";
import EditarServicio from "./paginas/EditarServicio"
import Calendario from "./paginas/Calendario"

import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import { ServiciosProvider } from "./context/ServiciosProvider"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiciosProvider>
          <ProyectosProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route
                  path="olvide-password/:token"
                  element={<NuevoPassword />}
                />
                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>


              <Route path="/servicios" element={<RutaProtegida />}>
                <Route index element={<Servicios />}/>
                <Route path="crear-servicio" element={<NuevoServicio />} />
                <Route 
                  path="nuevo-colaborador-servicios/:id"
                  element={<NuevoColaboradorServicios />}
                />
                <Route path=":id" element={<Servicio />} />
                <Route path="editar/:id" element={<EditarServicio />} />
              </Route>

              <Route path="/proyectos" element={<RutaProtegida />}>
                <Route index element={<Proyectos />} />
                <Route path="crear-proyecto" element={<NuevoProyecto />} />
                <Route
                  path="nuevo-colaborador/:id"
                  element={<NuevoColaborador />}
                />
                <Route path=":id" element={<Proyecto />} />
                <Route path="editar/:id" element={<EditarProyecto />} />
              </Route>

              <Route path="/calendario" element={<RutaProtegida />}>
                <Route index element={<Calendario />} />
              </Route>
            </Routes>
          </ProyectosProvider>
        </ServiciosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
