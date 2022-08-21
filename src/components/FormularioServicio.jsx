import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useServicios from '../hooks/useServicios'
import Alerta from './Alerta'

const FormularioServicio = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState("")
  const [fecha, setFecha] = useState("")
  const [dias, setDias] = useState("")
  const [numCisternas, setNumCisternas] = useState("")
  const [documentacion, setDocumentacion] = useState("")
  const [requisitosEquipo, setRequisitosEquipo] = useState("")
  const [epp, setEpp] = useState("")
  const [fechaUltimoServ, setFechaUltimoServ] = useState("")
  const [puntosInspeccion, setPuntosInspeccion] = useState("")
  const [observaciones, setObservaciones] = useState("")

  const params = useParams()

  const { mostrarAlerta, alerta, submitServicio, servicio } = useServicios();

  useEffect(() => {
    if(params.id) {
      setId(servicio._id)
      setNombre(servicio.nombre)
      setFecha(servicio.fecha?.split('T')[0])
      setDias(servicio.dias)
      setNumCisternas(servicio.numCisternas)
      setDocumentacion(servicio.documentacion)
      setRequisitosEquipo(servicio.requisitosEquipo)
      setEpp(servicio.epp)
      setFechaUltimoServ(servicio.fechaUltimoServ)
      setPuntosInspeccion(servicio.puntosInspeccion)
      setObservaciones(servicio.observaciones)
    }
  }, [params])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, fecha, dias, numCisternas, documentacion, requisitosEquipo, epp, fechaUltimoServ, puntosInspeccion, observaciones].includes("")) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });

      return
    }

    // Pasar los datos hacia provider
    await submitServicio({ id, nombre, fecha, dias, numCisternas, documentacion, requisitosEquipo, epp, fechaUltimoServ,puntosInspeccion, observaciones })

    setId(null)
    setNombre('')
    setFecha('')
    setDias('')
    setNumCisternas('')
    setDocumentacion('')
    setRequisitosEquipo('')
    setEpp('')
    setFechaUltimoServ('')
    setPuntosInspeccion('')
    setObservaciones('')
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Inmueble
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Inmueble"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha"
        >
          Fecha del Servicio
        </label>
        <input
          id="fecha"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="dias"
        >
          Duración del servicio en dias
        </label>
        <input
          id="fecha-entrega"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dias}
          onChange={(e) => setDias(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="numCisternas"
        >
          Numero de cisternas
        </label>
        <input
          id="numCisternas"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={numCisternas}
          onChange={(e) => setNumCisternas(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="documenatacion"
        >
          Documentación requerida para el servicio
        </label>
        <input
          id="documentacion"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Documentación requerida"
          value={documentacion}
          onChange={(e) => setDocumentacion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="requisitosEquipo"
        >
          Equipo necesario para el servicio
        </label>
        <input
          id="requisitosEquipo"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Espesifique el tipo de equipo"
          value={requisitosEquipo}
          onChange={(e) => setRequisitosEquipo(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="epp"
        >
          Equipo de protección personal requerido
        </label>
        <input
          id="epp"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Espesifique el tipo de equipo de protección personal"
          value={epp}
          onChange={(e) => setEpp(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fechaUltimoServ"
        >
          Fecha ultimo servicio
        </label>
        <input
          id="fechaUltimoServ"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Espesifique el ultimo servicio realizado"
          value={fechaUltimoServ}
          onChange={(e) => setFechaUltimoServ(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="puntosInpeccion"
        >
          Puntos importantes a inspeccionar
        </label>
        <input
          id="puntosInspeccion"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Puntos importantes a inspeccionar"
          value={puntosInspeccion}
          onChange={(e) => setPuntosInspeccion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="observaciones"
        >
          Observaciones
        </label>
        <input
          id="observaciones"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Observaciones a tener en cuenta para realizar el servicio"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? 'Actualizar Servicio' : 'Crear Servicio'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioServicio
