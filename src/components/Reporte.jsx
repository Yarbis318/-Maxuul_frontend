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
    estado,
    completado,
    _id,
    createdAt,
    updatedAt,
  } = reporte

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">Nombre: {nombreservicio}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Cantidad de sedimento: {sedimento}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Objetos encontrados: {objetos}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Condiciones del piso: {piso}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Condiciones de las parades: {paredes}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Condiciones del techo: {techo}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Condiciones de las tomas de agua: {succiones}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Numero de tomas de agua: {numerosucciones}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Condiciones de las escaleras: {escaleras}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Numero de escaleras: {numeroescaleras}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Vasos comunicantes: {vasoscomunicantes}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">Observaciones: {observaciones}</p>

        <p className="mb-1 text-sm text-gray-600">
          Creada: {formatearFecha(createdAt)}
        </p>
        <p className="mb-1 text-sm text-blue-600">
          Actualizada: {formatearFecha(updatedAt)}
        </p>

        { estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {reporte.completado.nombre}</p> }

        { completado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {reporte.completado.nombre}</p> }
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarReporte(reporte)}
          >
            Editar
          </button>
        )}

        <button 
          className={ `${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg `}            
          onClick={() => completarReporte(_id)}
          >
          {estado ? 'Completa' : 'Incompleta'}
          </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarReporte(reporte)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )

}

export default Reporte
