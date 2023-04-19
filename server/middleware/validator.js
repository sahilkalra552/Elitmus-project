import jwt from "jsonwebtoken";

export default async function validator(req, res, next) {
    let token;
    console.log("req",req.body);
    if(!(req.body.token===undefined)){
        token=req.body.token;
    }
    else{
        token=req.body[0].token;
        // token=req.body.token;
    }
    console.log("req",req.body);
    console.log("in token validator");
    if (!token) {
        console.log("no token");
        return res.status(401).send({
            message: 'No token provided'
        });
    }
    try {
        let decoded_jwt = jwt.verify(token, process.env.JWT_SECRET);

        req.decodedUser = decoded_jwt;
        console.log(decoded_jwt);
        console.log(token);
        next();
    } catch (error) {
        console.log(failed);
        return res.status(error.status || 500).json(error.message)
    }
}