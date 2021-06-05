import jwt from "jsonwebtoken";

const autoriacion = async (req, res, next) => {
    try {
        const token = req.headers.autoriacion.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(toekn && isCustomAuth){
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default autoriacion;