import useServicios from"../hooks/useServicios"

const ColaboradorServicios = ({ colaboradorServicios }) => {
  const { handleModalEliminarColaboradorServicios } = useServicios()

  const { nombre, email } = colaboradorServicios

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarColaboradorServicios(colaboradorServicios)}
        >Eliminar</button>
      </div>
    </div>
  )
  
}

export default ColaboradorServicios
