import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useServicios from "../hooks/useServicios";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from "socket.io-client";

let socket

const Servicio = () => {
  const params = useParams();
  const { obtenerServicio, servicio, cargando, handleModalTarea, alerta, submitTareasServicio } =
    useServicios();

  const admin = useAdmin()

  useEffect(() => {
    obtenerServicio(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir servicio', params.id)
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', tareaNueva => {
      if(tareaNueva.servicio === servicio._id) {
        submitTareasServicio(tareaNueva)
      }
    })

    //socket.on('tarea eliminda', tareaEliminada => {
      //if(tareaEliminada.servicio === servicio._id) {
        //eliminarTareaServicio(tareaEliminada)
      //}
    //})

    //socket.on('tarea actualizada', tareaActualizada => {
      //if(tareaActualizada.servicio._id === servicio._id) {
        //actualizarTareaServicio(tareaActualizada)
      //}
    //})

    //socket.on('nuevo estado', nuevoEstadoTarea => {
      //if(nuevoEstadoTarea.servicio._id === servicio._id) {
        //cambiarEstadoTarea(nuevoEstadoTarea)
      //}
    //})
  })
  
  const { nombre } = servicio;
  if (cargando) return "Cargando...";
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
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

      {admin && (
        <button
          onClick={handleModalTarea}
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className="font-bold text-xl mt-10">Tareas del Servicio</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {servicio.tareas?.length ? (
          servicio.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10 ">
            No hay tareas en este servicio
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl ">Colaboradores</p>
            <Link
              to={`/servicios/nuevo-colaborador/${servicio._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold"
            >
              Añadir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {servicio.colaboradores?.length ? (
              servicio.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                {" "}
                No hay colaboradores en este servicio
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
}

export default Servicio;