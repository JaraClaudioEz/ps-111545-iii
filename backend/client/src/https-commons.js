import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:5000/api/v1/imprenta", 
    headers: {
        "Content-type": "application/json"
    }
});