import { useState, useMemo } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal";
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'

registerLocale('es', es)

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const ModalFormularioCalendario = () => {

  const [isOpen, setIsOpen] = useState(true);

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: "Servicio",
    notes: "Inspección de cisterna",
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if ( !formSubmitted ) return '';

    return ( formValues.title.length > 0 )
      ? ''
      : 'invalid:border-red-500'

  }, [ formValues.title, formSubmitted ])

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  }

  const onSubmit = ( event ) => {
    event.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds( formValues.end, formValues.start )

    if ( isNaN( difference ) || difference <= 0 ) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if ( formValues.title.length <= 0 ) return

    console.log(formValues)

    // TODO:
    // Remover errores en pantalla
    // cerrar modal

  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal} style={customStyles}>
      <h1 className="text-gray-700 uppercase font-bold text-sm">
        Nuevo servicio
      </h1>
      <hr />
      <form className="my-5" onSubmit={ onSubmit }>
        <div className="font-bold text-sm">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={ formValues.start }
            onChange={ (event) => onDateChanged(event, 'start') }
            className="text-blue-700 border w-full p-2 mt-2 rounded-md"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className=" font-bold text-sm">
          <label>Fecha y hora fin</label>
          <DatePicker 
            minDate={ formValues.start }
            selected={ formValues.end }
            onChange={ (event) => onDateChanged(event, 'end') }
            className="text-blue-700 border w-full p-2 mt-2 rounded-md"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="uppercase font-bold text-sm">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`border w-full p-2 mt-2 placeholder-gray-400 rounded-md ${ titleClass }`}
            placeholder="Título del servicio"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small 
            id="emailHelp" 
            className="uppercase font-bold text-sm"
          >
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button 
          type="submit" 
          className="bg-sky-600 hover:bg-sky-700 text-white uppercase cursor-pointer transition-colors rounded text-sm"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

//export default ModalFormularioCalendario
