export const formatearFecha = date => {
  const nuevaFecha = new Date(( date.split('T')[0].split('-') ))
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
