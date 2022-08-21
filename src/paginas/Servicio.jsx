import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useServicios from "../hooks/useServicios";
import ModalFormularioReporte from '../components/ModalFormularioReporte'
import { formatearFecha } from "../helpers/formatearFecha";

import Img from '../assets/img/mundo-e.jpg'

const Servicio = () => {
  const params = useParams();
  const { obtenerServicio, servicio, cargando, handleModalReporte } = useServicios();

  const [modal, setModal] = useState(false)

  useEffect(() => {
    obtenerServicio(params.id);
  }, []);

  const { nombre } = servicio;
  const { fecha } = servicio;
  const { dias } = servicio;
  const { numCisternas } = servicio;
  const { documentacion } = servicio;
  const { requisitosEquipo } = servicio;
  const { epp } = servicio;
  const { fechaUltimoServ } = servicio;
  const { puntosInspeccion } = servicio;
  const { observaciones } = servicio;

  if (cargando) return "Cargando...";

  return (
    <div className="flex justify-between">
      <div className="flex p-6 font-mono ">
        <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-sky-900">
          <img
            src={ Img }
            alt=""
            className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        <form className="flex-auto pl-6">
          <div className="relative flex flex-wrap items-baseline pb-6 before:bg-sky-600 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
            <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
              {nombre}
            </h1>

            <div className="relative text-lg text-white">Dias: {dias}</div>
            <div className="relative uppercase ml-3">
              <p className="text-white">
                Fecha:{" "}
                <strong className="text-lime-500">
                  {fecha}
                </strong>
              </p>
            </div>
          </div>
          <div className="flex items-baseline my-6">
            <div className="space-x-3  text-lg font-medium">
              <h2 className="text-sky-900">
                {" "}
                <strong>Detalles del servicio</strong>
              </h2>
              <br />
              <p>Cisternas: {numCisternas}</p>
              <br />
              <div className="divide-y-2 divide-sky-600">
              <p>Documentación: {documentacion}</p>
              <p>Equipo: {requisitosEquipo}</p>
              <p>E.P.P.: {epp}</p>
              <p>Ultimo Servicio: {fechaUltimoServ}</p>
              <p>
                Puntos Importantes:{" "}
                <strong className="text-red-500">{puntosInspeccion}</strong>
              </p>
              <p>
                Observaciones:{" "}
                <strong className="text-red-500">{observaciones}</strong>
              </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>

              <Link
                to={`/servicios/editar/${params.id}`}
                className="uppercase font-bold"
              >
                Editar
              </Link>
            </div>
          </div>
          <div className="flex space-x-2 mb-4 text-sm font-medium">
            <div className="flex space-x-4">
              <button
                onClick={ handleModalReporte }
                className="px-5 h-12 uppercase px-5 py-3 rounded-lg font-semibold tracking-wider border-2 border-blue bg-sky-600 text-white flex gap-2 items-center"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Crear Reporte
              </button>
              <ModalFormularioReporte 
                modal={modal}
                setModal={setModal}
              />
              <button
                className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                type="button"
              >
                Agregar Colaborador
              </button>
            </div>
          </div>
          <p className="text-xs leading-6 text-slate-500">
            <strong className="text-red-500">IMPORTANTE:</strong> El reporte
            debe ser llenado el mismo día que se realizo el servicio.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Servicio;
