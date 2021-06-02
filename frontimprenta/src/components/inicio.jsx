import react from "react"
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="container-fluid">
      <Link to={"/productos"} className="btn btn-primary blck">Lista de Productos</Link>
      <p>lala</p>
    </div>
  );
}

export default Inicio;