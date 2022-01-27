import { Button } from 'react-bootstrap';

import OrdenDataService from "../services/servicio-orden.js";

//const backendURL = ""

const MpPaymentHandler = async (idUsuario) => {
    /*
  console.log(cookies);
  const response = await axios.post(
    backendURL,
    { cookies: cookies }
  );
  */
    const response = await OrdenDataService.checkout(idUsuario);
    window.location.href = response.data.init_point;
};

const MpButton = (props) => {
    return (
        <Button
            variant="primary"
            onClick={() => MpPaymentHandler(props.idUsuario)}
        >
            Comprar con MercadoPago
        </Button>
    );
};

export default MpButton;