import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Form, Button, InputGroup, Spinner, Modal } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCross } from '@fortawesome/free-solid-svg-icons'

import ProductoDataService from "../services/servicio-producto";

const AddProducto = props => {
    //console.log(props);
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

    const validar = yup.object({
        nombre_producto: yup.string()
            .max(30, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        provision: yup.string()
            .max(20, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        precio: yup.number()
            .required('Completa este campo.')
            .positive('Sólo valores positivos')
            .integer(),
        especificaciones: yup.string()
            .max(50, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        descripcion: yup.string()
            .max(200, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        //file: yup.mixed().required('Debe seleccionar una imagen para el producto.'),
        categoria: yup.string()
            .oneOf(
                ['Imprenta', 'Cartelería', 'Estampado'],
                'Seleccione una categoría del producto!'
            )
            .required('Seleccione una categoría del producto!'),
        precio_oferta: yup.number()
            .required('Completa este campo.')
            .positive('Sólo valores positivos')
            .integer(),
    });

    let editar = false;

    const history = useHistory();
    const chek = <FontAwesomeIcon icon={faCheck} />
    const cross = <FontAwesomeIcon icon={faCross} />

    const [categorias, setCategorias] = useState(["Seleccione..."]);
    const [producto, setProducto] = useState(estadoInicialProducto);
    //const [submitted, setSubmitted] = useState(false);

    const [fileData, setFileData] = useState();
    const [imagen, setImagen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
        history.push("/productos/agregar")
    };
    const handleShow = () => {
        setProducto(estadoInicialProducto);
        setShow(true);
    };

    /*
    const handleDisabled = () => {
        
        if (editar) {
            return false;
        }
        else if (imagen) {
            return true;
        }
        else {
            return false;
        };
    };
    */

    if (props.location.state && props.location.state.productoActual) {
        editar = true;
        //setProducto(props.location.state.productoActual)
    }

    const obtenerProducto = id => {
        ProductoDataService.getProducto(id)
            .then(response => {
                setProducto(response.data);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const traerCategorias = () => {
        ProductoDataService.getCategorias()
            .then(response => {
                //console.log(response);
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
    //console.log(producto);

    /*
    const handleInputChange = event => {
        const value = event.target.value;
        setProducto({ ...producto, [event.target.name]: value });
    };
    */

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0]);
        setImagen(true);
        setLoading(true);
    };

    const handleImageSubmit = async () => {

        //e.preventDefault();
        //setLoading(true);
        const formdata = new FormData();
        //console.log(fileData);
        formdata.append("imagen", fileData);

        if (editar) {
            const id = producto.imagen.id

            await ProductoDataService.updateImagen(formdata, id)
                .then(response => {

                    const imagen = {
                        url: response.data.url,
                        id: response.data.id
                    }

                    setProducto({ ...producto, imagen: imagen });
                    setLoading(false);
                    //console.log(producto);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            await ProductoDataService.addImagen(formdata)
                .then(response => {
                    //console.log(response);
                    const imagen = {
                        url: response.data.url,
                        id: response.data.id
                    }

                    setProducto({ ...producto, imagen: imagen })
                    setLoading(false);
                    //console.log(producto);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    useEffect(() => {
        if (loading) {
            handleImageSubmit();
        };
    }, [loading]);

    const saveProducto = (prod) => {

        //console.log(prod);

        let data = {
            _id: prod._id,
            nombre_producto: prod.nombre_producto,
            descripcion: prod.descripcion,
            especificaciones: prod.especificaciones,
            provision: prod.provision,
            categoria: prod.categoria,
            precio: prod.precio,
            oferta: prod.oferta,
            precio_oferta: prod.precio_oferta,
            imagen: {
                url: producto.imagen.url,
                id: producto.imagen.id
            }
        };
        console.log(data);

        if (editar) {
            //data._id = props.location.state.productoActual._id
            //console.log(data);
            ProductoDataService.updateProducto(data)
                .then(response => {
                    if (response.data.status === "Sin cambios") {
                        alert("No se realizaron cambios!")
                        //setSubmitted(true);
                        //handleShow();
                    }
                    else {
                        handleShow();
                    }
                    //setSubmitted(true);

                    console.log(response.data);
                })
                .catch(e => {
                    console.log({ message: "Error al cargar el producto.", error: e });
                });
        } else {
            ProductoDataService.addProducto(data)
                .then(response => {
                    //setSubmitted(true);
                    handleShow();
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }


    };

    return (
        <Formik
            validationSchema={validar}
            enableReinitialize={true}
            initialValues={{
                _id: producto._id ? producto._id : null,
                nombre_producto: producto.nombre_producto ? producto.nombre_producto : "",
                descripcion: producto.descripcion ? producto.descripcion : "",
                especificaciones: producto.especificaciones ? producto.especificaciones : "",
                provision: producto.provision ? producto.provision : "",
                categoria: producto.categoria ? producto.categoria : "",
                precio: producto.precio ? producto.precio : 0,
                oferta: producto.oferta ? producto.oferta : false,
                precio_oferta: producto.precio_oferta ? producto.precio_oferta : "",
                url: producto.imagen.url ? producto.imagen.url : "",
                id: producto.imagen.id ? producto.imagen.id : "",
                file: ""
            }}
            onSubmit={values => {

                //handleImageSubmit();
                const prod = {
                    ...producto,
                    _id: values._id,
                    nombre_producto: values.nombre_producto,
                    descripcion: values.descripcion,
                    especificaciones: values.especificaciones,
                    provision: values.provision,
                    categoria: values.categoria,
                    precio: values.precio,
                    oferta: values.oferta,
                    precio_oferta: values.precio_oferta,
                    imagen: {
                        ...producto.imagen,
                        url: values.url,
                        id: values.id
                    }
                }
                saveProducto(prod);
                //console.log(prod);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Container>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Producto {editar ? "Modificado!" : "Agregado!"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            La carga del producto se realizó con éxito!!<br></br>
                            Qué desea realizar a continuación?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Agregar nuevo Producto
                            </Button>
                            <Button variant="success" onClick={() => history.push("/productos")}>
                                Volver al Listado
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <h3 style={{ color: "#333" }}>{editar ? "Editar" : "Nuevo"} Producto:</h3>
                            <h4 className="display-4">{values.nombre_producto}</h4>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="file" className="mb-3 p-2 bg-light border">
                                    <Form.Label>Imagen del Producto:</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".jpg,.png,.jpeg"
                                            name="file"
                                            required
                                        />
                                        <InputGroup.Text id="basic-addon2" hidden={!imagen}>
                                            {loading ?
                                                <div>
                                                    <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    /> Cargando...
                                                </div> :
                                                <span style={{ color: "green" }} >
                                                    {chek}
                                                </span>}
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <Form.Text className="text-muted">
                                        {editar ? "Si desea cambiar la imagen del producto, seleccione la nueva imagen. Sino se mantendrá la previamente cargada." :
                                            "Seleccione la imagen a mostrar en la página para el producto."}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3  p-2 bg-light border">
                                    <Form.Label>Nombre del Producto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="nombre_producto"
                                        required
                                        value={values.nombre_producto}
                                        onChange={handleChange}
                                        name="nombre_producto"
                                        placeholder="Producto"
                                        isValid={touched.nombre_producto && !errors.nombre_producto}
                                        isInvalid={!!errors.nombre_producto}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombre_producto}
                                    </Form.Control.Feedback>
                                    <Form.Text id="ayudaProducto" muted>Introduza el nombre del producto.</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 p-2 bg-light border">
                                    <Form.Label>Categoría:</Form.Label>
                                    <Field name="categoria" as="select" className="form-control" >
                                        {categorias.map(categoria => {
                                            return (
                                                <option key={categoria} value={categoria.value}> {categoria.substr(0, 20)} </option>
                                            )
                                        })}
                                    </Field>
                                    {errors.categoria && <div className="input-feedback text-danger form-text">{errors.categoria}</div>}
                                    <div id="ayudaCategoria" className="form-text">Seleccione la categoría a la cual pertenece le producto.</div>
                                </Form.Group>
                                <Form.Group className="mb-3  p-2 bg-light border">
                                    <Form.Label>Provisión del Producto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="provision"
                                        required
                                        value={values.provision}
                                        onChange={handleChange}
                                        name="provision"
                                        placeholder="Provisión"
                                        isValid={touched.provision && !errors.provision}
                                        isInvalid={!!errors.provision}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.provision}
                                    </Form.Control.Feedback>
                                    <Form.Text id="ayudaProvision" muted>Introduza cómo se desea vender el producto. Ejemplo 1000 tarjetas, por metro, etc.</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 p-2 bg-light border">
                                    <Form.Label>Precio del Producto:</Form.Label>
                                    <InputGroup hasValidation className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            required
                                            value={values?.precio === null ? '' : values?.precio}
                                            onChange={handleChange}
                                            name="precio"
                                            placeholder="Precio"
                                            isValid={touched.precio && !errors.precio}
                                            isInvalid={!!errors.precio}
                                            min='0'

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.precio}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                    <Form.Text id="ayudaPrecio" muted>Introduza el precio del producto para la provision introducida anteriormente.</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 p-2 bg-light border">
                                    <Form.Label>Especificaciones del Producto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="especificaciones"
                                        required
                                        value={values.especificaciones}
                                        onChange={handleChange}
                                        name="especificaciones"
                                        placeholder="Especificaciones"
                                        isValid={touched.especificaciones && !errors.especificaciones}
                                        isInvalid={!!errors.especificaciones}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.especificaciones}
                                    </Form.Control.Feedback>
                                    <Form.Text id="ayudaEspecificaciones" muted>Introduza las especificaciones del producto. Por ejemplo calidad, gramaje, material, etc.</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 p-2 bg-light border">
                                    <Form.Label>Descripción del Producto:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="descripcion"
                                        value={values.descripcion}
                                        onChange={handleChange}
                                        name="descripcion"
                                        placeholder="Descripción..."
                                        isValid={touched.descripcion && !errors.descripcion}
                                        isInvalid={!!errors.descripcion}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descripcion}
                                    </Form.Control.Feedback>
                                    <Form.Text id="ayudaDescripcion" muted>Describa el producto, ventajas, usos. Información extra que desee mostrar.</Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 p-2 bg-light border">
                                    <Form.Label>Oferta:</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Checkbox
                                            name="oferta"
                                            id="oferta"
                                            value={values.oferta}
                                            checked={values.oferta}
                                            onChange={handleChange}
                                        />
                                        <InputGroup.Text id="ofertaPrepend">$</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            value={values?.precio_oferta === null ? '' : values?.precio_oferta}
                                            onChange={handleChange}
                                            name="precio_oferta"
                                            placeholder="Precio"
                                            isValid={touched.precio_oferta && !errors.precio_oferta}
                                            isInvalid={!!errors.precio_oferta}
                                            min='0'
                                            disabled={!values.oferta}
                                            required={values.oferta}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.precio_oferta}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                    <Form.Text id="ayudaOferta" muted>Active o desactive la oferta del producto e introduzca el nuevo precio en oferta.</Form.Text>
                                </Form.Group>

                                <div className="d-grid gap-2 my-4">
                                    <Button variant="success" type="submit">
                                        {editar ? "Modificar" : "Agregar"}
                                    </Button>
                                    <Link to={"/productos"} className="btn btn-danger">
                                        Cancelar
                                    </Link>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                    )
                </Container>
            )}
        </Formik >
    );
};

export default AddProducto;