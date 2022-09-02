import { Link } from "react-router-dom"
import useServicios from "../hooks/useServicios"
import PreviewServicio from "../components/PreviewServicio"
import Alerta from "../components/Alerta"

const Servicios = () => {
  const { servicios, alerta } = useServicios()

  console.log(servicios)

  const { msg } = alerta

  return (
    <>

      <Link
        type='button'
        to="crear-servicio"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
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
  )
}

export default Servicios
