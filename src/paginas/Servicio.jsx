import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useServicios from "../hooks/useServicios";
import useAdminServ from "../hooks/useAdminServ";
import ModalFormularioReporte from "../components/ModalFormularioReporte";
import ModalEliminarReporte from "../components/ModalEliminarReporte";
import ModalEliminarColaboradorServicios from "../components/ModalEliminarColaboradorServicios";
import Reporte from "../components/Reporte";
import Alerta from "../components/Alerta";
import ColaboradorServicios from "../components/ColaboradorServicios";
import io from "socket.io-client";

import Img from "../assets/img/mundo-e.jpg";

let socket;

const Servicio = () => {
  const params = useParams();
  const {
    obtenerServicio,
    servicio,
    cargando,
    handleModalReporte,
    alerta,
    submitReportesServicio,
    eliminarReporteServicio,
    actualizarReporteServicio,
  } = useServicios();

  const admin = useAdminServ();

  useEffect(() => {
    obtenerServicio(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir servicio", params.id);
  }, []);

  useEffect(() => {
    socket.on("reporte agregado", (reporteNuevo) => {
      if (reporteNuevo.servicio === servicio._id) {
        submitReportesServicio(servicioNuevo);
      }
    });

    socket.on("reporte eliminado", (reporteEliminado) => {
      if (reporteEliminado.servicio === servicio._id) {
        eliminarReporteServicio(reporteEliminado);
      }
    });

    socket.on("reporte actualizado", (reporteActualizado) => {
      if (nuevoEstadoReporte.servicio._id === servicio._id) {
        actualizarReporteServicio(reporteActualizado);
      }
    });
  });

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
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex p-6 font-mono ">
          <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-green-900">
            <img
              src={Img}
              alt=""
              className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <form className="flex-auto pl-6">
            <div className="relative flex flex-wrap items-baseline pb-6 before:bg-green-600 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                {nombre}
              </h1>

              <div className="relative text-lg text-white">Dias: {dias}</div>
              <div className="relative uppercase ml-3">
                <p className="text-white">
                  Fecha: <strong className="text-lime-200">{fecha}</strong>
                </p>
              </div>
            </div>
            <div className="flex items-baseline my-6">
              <div className="space-x-3  text-lg font-medium">
                <h2 className="text-green-900">
                  {" "}
                  <strong>Detalles del servicio</strong>
                </h2>
                <br />
                <p>Cisternas: {numCisternas}</p>
                <br />
                <div className="divide-y-2 divide-green-600">
                  <p>Documentaci??n: {documentacion}</p>
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
              {admin && (
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
              )}
            </div>
            <div className="flex space-x-2 mb-4 text-sm font-medium">
              <div className="flex space-x-4">
                {admin && (
                  <>
                    <button
                      onClick={handleModalReporte}
                      type="button"
                      className="px-5 h-12 uppercase py-3 rounded-lg font-semibold tracking-wider border-2 border-blue bg-green-600 text-white flex gap-2 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Crear Reporte
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-xs leading-6 text-slate-500">
              <strong className="text-red-500">IMPORTANTE:</strong> El reporte
              debe ser llenado el mismo d??a que se realizo el servicio.
            </p>
          </form>
        </div>
      </div>

      <p className="font-bold text-xl mt-10">Reportes del Servicio</p>

      <div className="flex justify-center">
        <div className="w-full md:1/3 lg:w-1/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-ls">
        {servicio.reportes?.length ? (
          servicio.reportes?.map((reporte) => (
            <Reporte key={reporte._id} reporte={reporte} />
          ))
        ) : (
          <p className="text-center my-5 p-10 ">
            No hay reportes en este servicio
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-center  mt-10">
            <p className="font-bold text-xl">Colaboradores del servicio.</p>
            <Link
              to={`/servicios/nuevo-colaborador-servicios/${servicio._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold"
            >
              A??adir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {servicio.colaboradores?.length ? (
              servicio.colaboradores?.map((colaboradorServicios) => (
                <ColaboradorServicios
                  key={colaboradorServicios._id}
                  colaboradorServicios={colaboradorServicios}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                {" "}
                Este servicio no tiene Buzos asignados
              </p>
            )}
          </div>
        </>
      )}
      <ModalFormularioReporte />
      <ModalEliminarReporte />
      <ModalEliminarColaboradorServicios />
    </>
  );
};

export default Servicio;
