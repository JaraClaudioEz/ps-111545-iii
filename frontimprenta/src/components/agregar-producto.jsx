import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/servicio-producto";
import { Link } from "react-router-dom";

const AddProducto = props => {
    console.log(props);
    const estadoInicialProducto = {
        _id: null,
        nombre_producto: "",
        descripcion: "",
        especificaciones: "",
        provision: "",
        categoria: "",
        precio: 0,
        oferta: false,
        precio_oferta: 0,
        imagen: {
            url: "",
            id: ""
        }
    };

    let editar = false;

    const [categorias, setCategorias] = useState(["Seleccione..."]);
    const [producto, setProducto] = useState(estadoInicialProducto);
    const [submitted, setSubmitted] = useState(false);

    const [fileData, setFileData] = useState();
    const [images, setFile] = useState("");

    if (props.location.state && props.location.state.productoActual) {
        editar = true;
        //setProducto(props.location.state.productoActual)
    }

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
                if (editar) {
                    setCategorias(response.data);
                }
                else {
                    setCategorias(["Seleccione..."].concat(response.data));
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        traerCategorias();
        if (editar) {
            obtenerProducto(props.match.params.id);
        }
    }, [props.match.params.id]);


    const handleInputChange = event => {
        const value = event.target.value;
        setProducto({ ...producto, [event.target.name]: value });
    };

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0]);
        setFile(target.value);
    };

    const handleSubmit = async () => {
        
        //e.preventDefault();

        const formdata = new FormData();

        formdata.append("imagen", fileData);

        if (editar) {
            const id = producto.imagen.id

            await ProductoDataService.updateImagen(formdata, id)
                .then(response => {

                    const imagen = {
                        url: response.data.url,
                        id: response.data.id
                    }

                    setProducto({ ...producto, imagen: imagen })
                    console.log(producto);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            await ProductoDataService.addImagen(formdata)
                .then(response => {
                    console.log(response);
                    const imagen = {
                        url: response.data.url,
                        id: response.data.id
                    }

                    setProducto({ ...producto, imagen: imagen })
                    console.log(producto);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const saveProducto = () => {

        let data = {
            _id: producto._id,
            nombre_producto: producto.nombre_producto,
            descripcion: producto.descripcion,
            especificaciones: producto.especificaciones,
            provision: producto.provision,
            categoria: producto.categoria,
            precio: producto.precio,
            oferta: producto.oferta,
            precio_oferta: producto.precio_oferta,
            imagen: {
                url: producto.imagen.url,
                id: producto.imagen.id
            }
        };

        if (editar) {
            //data._id = props.location.state.productoActual._id
            //console.log(data);
            ProductoDataService.updateProducto(data)
                .then(response => {
                    if (response.data.status === "Sin cambios") {
                        alert("No se realizaron cambios!")
                        setSubmitted(true);
                    }
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log({ message: "Error al cargar el producto.", error: e });
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
            {props.usuario ? (
                <div className="submit-form">
                    {submitted ? (
                        <div className="row">
                            <h4>Producto agregado!</h4>
                            <Link to={"/productos/agregar"} className="btn btn-primary">
                                Agregar nuevo Producto
                            </Link>
                            <Link to={"/productos"} className="btn btn-success">
                                Volver al Listado
                            </Link>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                <h2 className="display-2">{editar ? "Editar" : "Nuevo"} Producto</h2>
                                <h3>{producto.nombre_producto}</h3>
                                <form className="form-group mb-3">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre_producto"
                                            required
                                            value={producto.nombre_producto}
                                            onChange={handleInputChange}
                                            name="nombre_producto"
                                            placeholder="Producto"
                                        />
                                        <div id="ayudaProducto" className="form-text">Introduza el nombre del producto.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categoría:</label>
                                        <select name="categoria" onChange={handleInputChange} value={producto.categoria}>
                                            {categorias.map(categoria => {
                                                return (
                                                    <option value={categoria}> {categoria.substr(0, 20)} </option>
                                                )
                                            })}
                                        </select>
                                        <div id="ayudaCategoria" className="form-text">Seleccione la categoría a la cual pertenece le producto.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Provisión del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="provision"
                                            required
                                            value={producto.provision}
                                            onChange={handleInputChange}
                                            name="provision"
                                            placeholder="Provisión"
                                        />
                                        <div id="ayudaProvision" className="form-text">Introduza cómo se desea vender el producto. Ejemplo 1000 tarjetas, por metro, etc.</div>
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
                                        <div id="ayudaPrecio" className="form-text">Introduza el precio del producto para la provision introducida anteriormente.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Especificaciones del Producto:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="especificaciones"
                                            required
                                            value={producto.especificaciones}
                                            onChange={handleInputChange}
                                            name="especificaciones"
                                            placeholder="Especificaciones"
                                        />
                                        <div id="ayudaEspecificaciones" className="form-text">Introduza las especificaciones del producto. Por ejemplo calidad, gramaje, material, etc.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción del Producto:</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="descripcion"
                                            required
                                            value={producto.descripcion}
                                            onChange={handleInputChange}
                                            name="descripcion"
                                            placeholder="Descripción"
                                        />
                                        <div id="ayudaDescripcion" className="form-text">Describa el producto, ventajas, usos. Información extra que desee mostrar.</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <input
                                                    className="form-check-input mt-0"
                                                    type="radio"
                                                    id="oferta"
                                                    value={true}
                                                    checked={producto.oferta === true}
                                                    onChange={handleInputChange}
                                                    name="oferta"
                                                />
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="precio_oferta"
                                                required
                                                value={producto.precio_oferta}
                                                onChange={handleInputChange}
                                                name="precio_oferta"
                                                placeholder="Precio"
                                            />
                                        </div>
                                        <div id="ayudaOferta" className="form-text">Active o desactive la oferta del producto e introduzca el nuevo precio en oferta.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Imagen del Producto:</label>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                accept=".jpg,.png,.jpeg"
                                                className="form-control"
                                                id="imagen"
                                                required
                                                value={images.name}
                                                onChange={handleFileChange}
                                                name="imagen"
                                                placeholder="Imagen"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={handleSubmit}
                                                type="button"
                                                id="subirImagen">Cargar Imagen</button>
                                        </div>
                                        <div id="ayudaEspecificaciones" className="form-text">Cargue la imagen a mostrar en la página.</div>
                                    </div>
                                </form>
                                <button onClick={saveProducto} className="btn btn-success">
                                    {editar ? "Modificar" : "Agregar"}
                                </button>
                                <Link to={"/productos"} className="btn btn-danger">
                                    Cancelar
                                </Link>
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