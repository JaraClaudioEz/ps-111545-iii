import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/servicio-producto";
import { Link } from "react-router-dom";

const AddProducto = props => {

    const estadoInicialProducto = {
        id: null,
        nombre: "",
        descripcion: "",
        especificaciones: "",
        provision: "",
        categoria: "",
        precio: 0,
        oferta: false,
        precio_oferta: 0,
        imagen: ""
    };

    let editar = false;


    if (props.location.state && props.location.state.productoActual) {
        editar = true;
        //setProducto(props.location.state.productoActual)
    }

    const [categorias, setCategorias] = useState(["Todas"]);
    const [searchCategoria, setSearchCategoria] = useState("");
    const [producto, setProducto] = useState(estadoInicialProducto);
    const [submitted, setSubmitted] = useState(false);

    const obtenerProducto = id => {
        ProductoDataService.getProducto(id)
            .then(response => {
                setProducto(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const traerCategorias = () => {
        ProductoDataService.getCategorias()
            .then(response => {
                console.log(response.data);
                setCategorias(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        obtenerProducto(props.match.params.id);
    }, [props.match.params.id]);


    const handleInputChange = event => {
        setProducto(event.target.value);
    };

    const onChangeSearchCategoria = e => {
        const searchCategoria = e.target.value;
        setSearchCategoria(searchCategoria);
    
      };

    const saveProducto = () => {

        const data = {
            _id: producto._id,
            nombre: producto.nombre_producto,
            descripcion: producto.descripcion,
            especificaciones: producto.especificaciones,
            provision: producto.provision,
            categoria: producto.categoria,
            precio: producto.precio,
            oferta: producto.oferta,
            precio_oferta: producto.precio_oferta,
            imagen: producto.imagen
        };
        /*
        var data = {
            text: producto.nombre,
            name: props.user.name,
            user_id: props.user.id,
            producto_id: props.match.params.id
        };
        */

        if (editar) {
            data._id = props.location.state.productoActual._id
            ProductoDataService.updateProducto(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            ProductoDataService.addProducto(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    return (
        <div className="container">
            {props.user ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>Producto agregado!</h4>
                            <Link to={"/productos/" + producto._id} className="btn btn-success">
                                Ver Producto
                            </Link>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                <h2>{editar ? "Editar" : "Nuevo"} Producto</h2>
                                <h3>{producto.nombre_producto}</h3>
                                <form className="form-group mb-3">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="text"
                                            required
                                            value={producto.nombre_producto}
                                            onChange={handleInputChange}
                                            name="text"
                                            placeholder="Producto"
                                        />
                                        <div id="ayudaProducto" className="form-text">Introduza el nombre del producto.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categoría:</label>
                                        <select onChange={onChangeSearchCategoria}>
                                            {categorias.map(categoria => {
                                                return (
                                                    <option value={categoria}> {categoria.substr(0, 20)} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Provisión del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="prov"
                                            required
                                            value={producto.provision}
                                            onChange={handleInputChange}
                                            name="prov"
                                            placeholder="Provisión"
                                        />
                                        <div id="ayudaEspecificaciones" className="form-text">Introduza cómo se desea vender el producto. Ejemplo 1000 tarjetas, por metro, etc.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Precio del Producto:</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="precio"
                                                required
                                                value={producto.precio}
                                                onChange={handleInputChange}
                                                name="precio"
                                                placeholder="Precio"
                                            />
                                        </div>
                                        <div id="ayudaEspecificaciones" className="form-text">Introduza el precio del producto para la provision introducida anteriormente.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Especificaciones del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="esp"
                                            required
                                            value={producto.especificaciones}
                                            onChange={handleInputChange}
                                            name="esp"
                                            placeholder="Especificaciones"
                                        />
                                        <div id="ayudaEspecificaciones" className="form-text">Introduza las especificaciones del producto. Por ejemplo calidad, gramaje, material, etc.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción del Producto:</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="desc"
                                            required
                                            value={producto.descripcion}
                                            onChange={handleInputChange}
                                            name="desc"
                                            placeholder="Descripción"
                                        />
                                        <div id="ayudaDescripcion" className="form-text">Describa el producto, ventajas, usos. Información extra que desee mostrar.</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <input className="form-check-input mt-0" type="radio" value={producto.oferta} />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="precioOferta"
                                                required
                                                value={producto.precio_oferta}
                                                onChange={handleInputChange}
                                                name="precioOferta"
                                                placeholder="Precio"
                                            />
                                        </div>
                                        <div id="ayudaOferta" className="form-text">Active o desactive la oferta del producto e introduzca el nuevo precio en oferta.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Imagen del Producto:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="imagen"
                                                required
                                                value={producto.imagen}
                                                onChange={handleInputChange}
                                                name="imagen"
                                                placeholder="Imagen"
                                                disabled
                                            />
                                            <button className="btn btn-outline-secondary" type="button" id="subirImagen">Cargar Imagen</button>
                                        </div>
                                        <div id="ayudaEspecificaciones" className="form-text">Cargue la imagen a mostrar en la página.</div>
                                    </div>
                                </form>
                                <button onClick={saveProducto} className="btn btn-success">
                                    {editar ? "Modificar" : "Agregar"}
                                </button>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                    )}
                </div>

            ) : (
                <div>
                    Inicie sesión.
                </div>
            )}

        </div>
    );
};

export default AddProducto;