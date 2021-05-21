import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/servicio-producto";
import { Link } from "react-router-dom";

const AddProducto = props => {
    const estadoInicialProducto = {
        id: null,
        nombre: "",
        descripcion: "",
        provision: {},
        categoria: "",
        opciones: [{}]
      };

    let editar = false;

    /*
    if (props.location.state && props.location.state.currentReview) {
      editar = true;
      initialReviewState = props.location.state.currentReview.text
    }
    */

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

    useEffect(() => {
        obtenerProducto(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        setProducto(event.target.value);
    };

    const saveProducto = () => {
        var data = {
            text: producto.nombre,
            name: props.user.name,
            user_id: props.user.id,
            producto_id: props.match.params.id
        };

        if (editar) {
            data.producto_id = props.location.state.productoActual._id
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
        <div>
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
                        <div>
                            <h3>{producto.nombre_producto}</h3>
                            <div className="form-group">
                                <label htmlFor="description">{editar ? "Editar" : "Nuevo"} Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={producto.nombre_producto}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveProducto} className="btn btn-success">
                                Agregar
                            </button>
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