import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios";

const ServiciosContext = createContext()

const ServiciosProvider = ({ children }) => {

  const [servicios, setServicios] = useState([])
  const [alerta, setAlerta] = useState([])

  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    }, 3000)
  }

  const submitServicio = async ( servicio ) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.post('/servicios', servicio, config)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        mostrarAlerta,
        alerta,
        submitServicio
      }}
    >
      {children}
    </ServiciosContext.Provider>
  )
}

export {
  ServiciosProvider
}

export default ServiciosContext
