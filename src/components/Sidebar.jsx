import useAuth from "../hooks/useAuth";

const Sidebar = () => {

  const { auth } = useAuth();


  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre}</p>
      <p className="text-sl"> {auth.email}</p>
      {/*// Agregar toda la información del usuario*/}
    </aside>
  );
};

export default Sidebar;
