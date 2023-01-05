import Logo from '../assets/img/MaxuulBlanco.png'

const Logotipo = ({}) => {
  return (
    <img 
        src={Logo}
        alt="Logo Maxuul"
        className="w-3/5 h-1/3"
        loading="lazy"
      />
  )
}

export default Logotipo