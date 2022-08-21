import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import useServicios from "../hooks/useServicios"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"

const ESTADO = ["Proceso", "Realizado"]

const ModalFormularioReporte = () => {

  const [id, setId] = useState("")
  const [sedimento, setSedimento] = useState("")
  const [objetos, setObjetos] = useState("")
  const [piso, setPiso] = useState("")
  const [paredes, setParedes] = useState("")
  const [techo, setTecho] = useState("")
  const [succiones, setSucciones] = useState("")
  const [numerosucciones, setNumerosucciones] = useState("")
  const [escaleras, setEscaleras] = useState("")
  const [numeroescaleras, setNumeroescaleras] = useState("")
  const [vasoscomunicantes, setVasoscomunicantes] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [estado, setEstado] = useState("")

  const params = useParams()

  const {
    modalFormularioReporte,
    handleModalReporte,
    mostrarAlerta,
    alerta,
    submitReporte,
    reporte
  } = useServicios()

  useEffect(() => {
    if(reporte?._id) {
      setId(reporte._id)
      setSedimento(reporte.sedimento)
      setObjetos(reporte.objetos)
      setPiso(reporte.piso)
      setParedes(reporte.paredes)
      setTecho(reporte.techo)
      setSucciones(reporte.succiones)
      setNumerosucciones(reporte.numerosucciones)
      setEscaleras(reporte.escaleras)
      setNumeroescaleras(reporte.numeroescaleras)
      setVasoscomunicantes(reporte.vasoscomunicantes)
      setObservaciones(reporte.observaciones)
      setEstado(reporte.estado)
      return
    }
    setId('')
    setSedimento('')
    setObjetos('')
    setPiso('')
    setParedes('')
    setTecho('')
    setSucciones('')
    setNumerosucciones('')
    setEscaleras('')
    setNumeroescaleras('')
    setVasoscomunicantes('')
    setObservaciones('')
    setEstado('')

  }, [reporte])
  
  const handleSubmit = async e => {
    e.preventDefault();

    if([sedimento, objetos, piso, paredes, techo, succiones, numerosucciones, escaleras, numeroescaleras, vasoscomunicantes, observaciones, estado].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      return
    }

    await submitReporte({ id, sedimento, objetos, piso, paredes, techo, succiones, numerosucciones, escaleras, numeroescaleras, vasoscomunicantes, observaciones, estado, servicio: params.id })

    setId('')
    setSedimento('')
    setObjetos('')
    setPiso('')
    setParedes('')
    setTecho('')
    setSucciones('')
    setNumerosucciones('')
    setEscaleras('')
    setNumeroescaleras('')
    setVasoscomunicantes('')
    setObservaciones('')
    setEstado('')
  }

  const { msg } = alerta

  return (
    <Transition.Root show={modalFormularioReporte} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalReporte}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={ handleModalReporte }
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? 'Editar Reporte' : 'Crear Reporte'}
                  </Dialog.Title>

                  {msg && <Alerta alerta={alerta} />}

                  <form 
                    onSubmit={handleSubmit} 
                    className="my-10"
                  >
                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="sedimento"
                      >
                        Sedimento
                      </label>
                      <input
                        type="text"
                        id="sedimento"
                        placeholder="Caracteristicas y cantidad de sedimento"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sedimento}
                        onChange={(e) => setSedimento(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="Objetos"
                      >
                        Objetos
                      </label>
                      <textarea
                        id="objetos"
                        placeholder="Descripción de los objetos encontrados"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={objetos}
                        onChange={(e) => setObjetos(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="piso"
                      >
                        Piso
                      </label>
                      <input
                        type="text"
                        id="piso"
                        placeholder="Condiciones del piso de la cisterna"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={piso}
                        onChange={(e) => setPiso(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="paredes"
                      >
                        Paredes
                      </label>
                      <input
                        type="text"
                        id="paredes"
                        placeholder="Condiciones de las paredes de la cisterna"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={paredes}
                        onChange={(e) => setParedes(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="techo"
                      >
                        Techo
                      </label>
                      <input
                        type="text"
                        id="techo"
                        placeholder="Condiciones del techo de la cisterna"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={techo}
                        onChange={(e) => setTecho(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="succiones"
                      >
                        Tomas de Agua
                      </label>
                      <input
                        type="text"
                        id="succiones"
                        placeholder="Condiciones de las tomas de agua de la cisterna"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={succiones}
                        onChange={(e) => setSucciones(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="numerosucciones"
                      >
                        Numero de tomas de agua
                      </label>
                      <input
                        type="number"
                        id="numerosucciones"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={numerosucciones}
                        onChange={(e) => setNumerosucciones(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="escaleras"
                      >
                        Escaleras
                      </label>
                      <input
                        type="text"
                        id="escaleras"
                        placeholder="Condiciones de las escaleras"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={escaleras}
                        onChange={(e) => setEscaleras(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="numeroescaleras"
                      >
                        Numero de Escaleras
                      </label>
                      <input
                        type="number"
                        id="numeroescaleras"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={numeroescaleras}
                        onChange={(e) => setNumeroescaleras(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="vasoscomunicantes"
                      >
                        Vasos Comunicantes
                      </label>
                      <input
                        type="text"
                        id="vasoscomunicantes"
                        placeholder="Indica si la cisterna cuenta con vasos comunicantes y cuantos"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={vasoscomunicantes}
                        onChange={(e) => setVasoscomunicantes(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="observaciones"
                      >
                        Observaciones
                      </label>
                      <textarea
                        id="observaciones"
                        placeholder="Indica las observaciones que tienes"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="estado"
                      >
                        Estado del servicio
                      </label>
                      <select
                        id="estado"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                      >
                        <option value="">-- Seleccionar --</option>
                        {ESTADO.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                      value={ id ? 'Guardar Cambios': 'Crear Reporte' }
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFormularioReporte
