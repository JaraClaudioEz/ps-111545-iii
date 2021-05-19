import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/servicio-producto";
import { Link } from "react-router-dom";
import logo from "../assets/IntegralLogo.png";

const ListaProductos = props => { 
    const [productos, setProductos] = useState([]);
    const [searchNombre, setSearchNombre] = useState("");
    const [searchCategoria, setSearchCategoria] = useState("");
    const [categorias, setCategorias] = useState(["Todas"]);

    useEffect(() => {
        traerProductos();
        traerCategorias();
    }, []);

    const onChangeSearchNombre = e => {
        const searchNombre = e.target.value; 
        setSearchNombre(searchNombre);
    };

    const onChangeSearchCategoria = e => {
        const searchCategoria = e.target.value;
        setSearchCategoria(searchCategoria);

    };

    const traerProductos = () => {
      ProductoDataService.getListadoProductos()
            .then(response => {
                console.log(response.data);
                setProductos(response.data.productos);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const traerCategorias = () => {
      ProductoDataService.getCategorias()
            .then(response => {
                console.log(response.data);
                setCategorias(["Todas"].concat(response.data));

            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
      traerProductos();
    }

    const find = (query, by) => {
      ProductoDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setProductos(response.data.productos);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByNombre = () => {
        find(searchNombre, "nombre")
    };

    const findByCategoria = () => {
        if (searchCategoria === "Todas") {
            refreshList();
        } else {
            find(searchCategoria, "categoria")
        }
    };

    return (
        <div className="container">
            <div className="row pb-3">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Búsqueda por nombre"
                        value={searchNombre}
                        onChange={onChangeSearchNombre}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByNombre}
                            >
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">
                    <select onChange={onChangeSearchCategoria}>
                        {categorias.map(categoria => {
                            return (
                                <option value={categoria}> {categoria.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCategoria}
                            >
                            Buscar
                        </button>
                    </div>

                </div>
            </div>
            <div className="row">
                {productos.map((producto) => {
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <img src={logo} class="card-img-top" alt="logo"/>
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre_producto}</h5>
                                    <p className="card-text">
                                        <strong>Categoría: </strong>{producto.categoria}<br />
                                        <strong>Descripción: </strong>{producto.descripcion}
                                    </p>
                                    <div className="row">
                                        <Link to={"/productos/" + producto._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            Ver Producto
                                        </Link>
                                        <button className="btn btn-primary col-lg-5 mx-1 mb-1" type="button">Agrerar al Carrito</button>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListaProductos;