import { Link } from "react-router-dom"
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'
import Busqueda from "./Busqueda"

import Logo from '../assets/img/MaxuulBlanco.png'

const Header = () => {

  const {handleBuscador, cerrarSesionProyectos} = useProyectos()
  const { cerrarSesionAuth } = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <img 
          src={Logo}
          alt="Logo Maxuul"
          className="w-1/4 h-1/3"
          loading="lazy"
        />

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleBuscador}
          >Buscar Proyecto</button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>

          <Link to="/servicios" className="font-bold uppercase">
            Servicios
          </Link>

          {/*<Link to="/calendario" className="font-bold uppercase">
            Calendario
          </Link>*/}

          <button 
            type="button" 
            className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >Cerrar Sesión</button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
