import { useEffect } from "react"
import FormularioColaboradorServicios from "../components/FormularioColaboradorServicios"
import useServicios from "../hooks/useServicios"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoColaboradorServicios = () => {

  const {
    obtenerServicio,
    servicio,
    cargando,
    colaboradorServicios,
    agregarColaboradorServicios,
    alerta
  } = useServicios()

  const params = useParams()

  useEffect(() => {
    obtenerServicio(params.id)
  }, [])

  if(!servicio?._id) return <Alerta alerta={alerta} />

  return(
    <>
      <h1 className="text-4xl font-black">
        Añadir Cloaborador(a) al Servicio: {servicio.nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaboradorServicios />
      </div>

      {cargando ? (
        <p className="text-center">cargando...</p>
      ) : (
        colaboradorServicios?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>

              <div className="flex justify-between items-center">
                <p>{colaboradorServicios.nombre}</p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarColaboradorServicios({
                      email: colaboradorServicios.email,
                    })
                  }
                >
                  Agregar al Servicio
                </button>
              </div>
            </div>
          </div>
        )
      )}
      </>
    )

}

export default NuevoColaboradorServicios
