import { formatearFecha } from "../helpers/formatearFecha"
import useServicios from "../hooks/useServicios"
import useAdmin from "../hooks/useAdmin"

const Reporte = ({ reporte }) => {
  const { handleModalEditarReporte, handleModalEliminarReporte, completarReporte } = useServicios()

  const admin = useAdmin()

  const {
    nombreservicio,
    sedimento,
    objetos,
    piso,
    paredes,
    techo,
    succiones,
    numerosucciones,
    escaleras,
    numeroescaleras,
    vasoscomunicantes,
    observaciones,
    status,
    estado,
    completado,
    _id,
    createdAt,
    updatedAt,
  } = reporte

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start m-l3 space-x-3">
        <p className="bg-sky-600 text-white mb-2 text-xl shadow-lg rounded-lg pt-6 pb-6 pl-6 pr-4 text-center">Cisterna: <strong>{nombreservicio}</strong></p>
        <p className="mb-2 text-xl uppercase">Cantidad de sedimento: <strong className="text-black">{sedimento}</strong></p>
        <p className="mb-2 text-xl uppercase">Objetos encontrados: <strong className="text-black">{objetos}</strong></p>
        <p className="mb-2 text-xl uppercase">Condiciones del piso: <strong className="text-black">{piso}</strong></p>
        <p className="mb-2 text-xl uppercase">Condiciones de las paredes: <strong className="text-black">{paredes}</strong></p>
        <p className="mb-2 text-xl uppercase">Condiciones del techo: <strong>{techo}</strong></p>
        <p className="mb-2 text-xl  uppercase">Condiciones de las tomas de agua: <strong>{succiones}</strong></p>
        <p className="mb-2 text-xl  uppercase">Numero de tomas de agua: <strong>{numerosucciones}</strong></p>
        <p className="mb-2 text-xl  uppercase">Condiciones de las escaleras: <strong>{escaleras}</strong></p>
        <p className="mb-2 text-xl  uppercase">Numero de escaleras: <strong>{numeroescaleras}</strong></p>
        <p className="mb-2 text-xl  uppercase">Vasos comunicantes: <strong>{vasoscomunicantes}</strong></p>
        <p className="mb-2 text-xl  uppercase">Observaciones: <strong>{observaciones}</strong></p>

        <p className="mb-1 text-lg text-gray-600">
          Creada: {formatearFecha(createdAt)}
        </p>
        <p className="mb-1 text-lg text-blue-600">
          Actualizada: {formatearFecha(updatedAt)}
        </p>

        {/*{ estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {reporte.completado.nombre}</p> }

        { completado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {reporte.completado.nombre}</p> }*/}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {/*<button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditarReporte(reporte)}
        >
          Editar
        </button>*/}

        {status ? (

        <button
          className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Completa
        </button>
        ) : (

        <button
          className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >
          Incompleta
        </button>
        )}


        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarReporte(reporte)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )

}

export default Reporte
