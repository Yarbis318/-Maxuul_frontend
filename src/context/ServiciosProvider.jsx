import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"

let socket

const ServiciosContext = createContext();

const ServiciosProvider = ({ children }) => {

  const [servicios, setServicios] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [servicio, setServicio] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioReporte, setModalFormularioReporte] = useState(false);
  const [reporte, setReporte] = useState({});
  const [modalEliminarReporte, setModalEliminarReporte] = useState(false);
  const [colaboradorServicios, setColaboradorServicios] = useState({});
  const [modalEliminarColaboradorServicios, setModalEliminarColaboradorServicios] = useState(false);
  const [buscador, setBuscador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth()

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await clienteAxios("/servicios", config);
        setServicios(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerServicios();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const mostrarAlerta = alerta => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const submitServicio = async (servicio) => {
    if (servicio.id) {
      await editarServicio(servicio);
    } else {
      await nuevoServicio(servicio);
    }
  };

  const editarServicio = async servicio => {
    try {
      
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(`/servicios/${servicio.id}`, servicio, config);

      // Sincronizar el state
      const serviciosActualizados = servicios.map(servicioState => servicioState._id === data._id ? data : servicioState)
      setServicios(serviciosActualizados);

      setAlerta({
        msg: "Servicio Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/servicios");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoServicio = async servicio => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/servicios", servicio, config);

      setServicios([...servicios, data]);

      setAlerta({
        msg: "Servicio Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/servicios");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerServicio = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      const { data } = await clienteAxios(`/servicios/${id}`, config )
      setServicio(data)
      setAlerta({})
    } catch (error) {
      navigate('/servicios')

      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 300)
    } finally {
      setCargando(false)
    }
  };

  const eliminarServicio = async (id) => {
    try {

      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/servicios/${id}`, config);

      // Sincronizar el state
      const serviciosActualizados = servicios.filter(servicioState => servicioState._id !== id)
      setServicios(serviciosActualizados)

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/servicios")
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalReporte = () => {
    setModalFormularioReporte(!modalFormularioReporte);
    setReporte({})
  }

  const submitReporte = async reporte => {
    if(reporte?.id) {
      await editarReporte(reporte)
    } else {
      await crearReporte(reporte)
    }
  }

  const crearReporte = async reporte => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      const { data } = await clienteAxios.post('/reportes', reporte, config);

      setAlerta({})
      setModalFormularioReporte(false)

      // SOCKET IO
      socket.emit("nuevo reporte", data)
    } catch (error) {
      console.log(error);
    }
  };

  const editarReporte = async reporte => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      const { data } = await clienteAxios.put(`/reportes/${reporte.id}`, reporte, config)

      setAlerta({});
      setModalFormularioReporte(false);

      // SOCKET
      socket.emit('actualizar reporte', data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEditarReporte = reporte => {
    setReporte(reporte);
    setModalFormularioReporte(true);
  };

  const handleModalEliminarReporte = reporte => {
    setReporte(reporte)
    setModalEliminarReporte(!modalEliminarReporte)
  };

  const eliminarReporte = async () => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/reportes/${reporte._id}`, config);
      setAlerta({
        msg: data.msg,
        error: false,
      })
      
      setModalEliminarReporte(false);

      // SOCKET
      socket.emit('eliminar reporte', reporte)

      setReporte({})
      setTimeout(() => {
        setAlerta({})
      }, 3000)

    } catch (error) {
      console.log(error)
    }
  }

  const submitColaboradorServicios = async email => {

    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post("/servicios/colaboradores", { email }, config)

      setColaboradorServicios(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaboradorServicios = async email => {

    try {

      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/servicios/colaboradores/${servicio._id}`, email, config)

      setAlerta({
        msg: data.msg,
        error: false,
      })
      setColaboradorServicios({});

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const handleModalEliminarColaboradorServicios = (colaboradorServicios) => {
    setModalEliminarColaboradorServicios(!modalEliminarColaboradorServicios);
    setColaboradorServicios(colaboradorServicios);
  };

  const eliminarColaboradorServicios = async () => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
      const { data } = await clienteAxios.post(`/servicios/eliminar-colaborador-servicios/${servicio._id}`, { id: colaboradorServicios._id }, config)

      const servicioActualizado = { ...servicio };

      servicioActualizado.colaboradores = servicioActualizado.colaboradores.filter(colaboradorServiciosState => colaboradorServiciosState._id !== colaboradorServicios._id);

      setServicio(servicioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      })

      setColaboradorServicios({})
      setModalEliminarColaboradorServicios(false)

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  }

  const completarReporte = async id => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(`/reportes/estado/${id}`, {}, config)

      setReporte({});
      setAlerta({});

      // Socket
      socket.emit('cambiar estado', data)

    } catch (error) {
      console.log(error.response)
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Socket io
  
  const submitReportesServicio = (reporte) => {
    //Agregar el reporte al state
    const servicioActualizado = { ...servicio };
    servicioActualizado.reportes = [...servicioServicioActualizado.reportes, reporte];
    setReporte(reporteActualizado);
  };

  const eliminarReporteServicio = reporte => {
    const servicioActualizado = { ...servicio }
    servicioActualizado.reportes = servicioActualizado.reportes.filter(reporteState => reporteState._id !== reporte._id)
    setServicio(servicioActualizado)
  }

  const actualizarReporteServicio = reporte => {
    const servicioActualizado = { ...servicio }
    servicioActualizado.reportes = servicioActualizado.reportes.map( reporteState => reporteState._id === reporte._id ? reporte : reporteState )
    setServicio(servicioActualizado)
  }

  const cambiarEstadoReporte = reporte => {
    const servicioActualizado = { ...servicio }
    servicioActualizado.reportes = servicioActualizado.reportes.map(reporteState => reporteState._id === reporte._id ? reporte : reporteState)
    setServicio(servicioActualizado)
  }


  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        mostrarAlerta,
        alerta,
        submitServicio,
        obtenerServicio,
        servicio,
        cargando,
        eliminarServicio,
        modalFormularioReporte,
        handleModalReporte,
        submitReporte,
        handleModalEditarReporte,
        reporte,
        modalEliminarReporte,
        handleModalEliminarReporte,
        eliminarReporte,
        submitColaboradorServicios,
        colaboradorServicios,
        agregarColaboradorServicios,
        handleModalEliminarColaboradorServicios,
        modalEliminarColaboradorServicios,
        eliminarColaboradorServicios,
        completarReporte,
        buscador,
        handleBuscador,
        submitReportesServicio,
        eliminarReporteServicio,
        actualizarReporteServicio,
        cambiarEstadoReporte,

      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};

export { ServiciosProvider };

export default ServiciosContext;
