import { useEffect } from "react";
import { Link } from "react-router-dom";
import useServicios from "../hooks/useServicios";
import PreviewServicio from "../components/PreviewServicio";
import Alerta from "../components/Alerta";

const Servicios = () => {
  const { servicios, alerta } = useServicios();

  const { msg } = alerta;

  return (
    <>
      <Link
        type="button"
        to="crear-servicio"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-600 text-white text-center mt-5 flex gap-2 items-center justify-cneter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Crear Nuevo Servicio
      </Link>

      <h1 className="text-4xl font-black">Servicios</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {servicios.length ? (
          servicios.map((servicio) => (
            <PreviewServicio key={servicio._id} servicio={servicio} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay Servicios
          </p>
        )}
      </div>
    </>
  );
};

export default Servicios;
