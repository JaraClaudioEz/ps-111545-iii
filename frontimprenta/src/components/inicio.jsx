import react from "react"
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="container-fluid">
      
      <h1>IMPRENTA INTEGRAL IMAGEN</h1>

      <Link to={"/productos"} className="btn btn-primary blck">Lista de Productos</Link>
    </div>
  );
}

export default Inicio;