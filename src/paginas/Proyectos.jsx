import { Link } from 'react-router-dom'
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos()
  const { msg } = alerta

  return (
    <>

      <Link
        type='button'
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>

      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className=" text-center text-gray-600 uppercase p-5">
            No hay Proyectos
          </p>
        )}
      </div>
    </>
  )
}

export default Proyectos
