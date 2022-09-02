import useServicios from "./useServicios"
import useAuth from "./useAuth"

const useAdmin = () => {
  const { servicio } = useServicios()
  const { auth } = useAuth()
  return servicio.creador === auth._id
}

export default useAdmin
