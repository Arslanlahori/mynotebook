const jwt = require('jsonwebtoken');

//Secret key
const JWT_SECRET = "Arslanansari@12345isaintelligentboy"

const fetchuser = (req, res, next) => {
    //get the user from jwt token and add the id to req
    const token = req.header('token')
    if (!token) {
        res.status(401).send({ error: 'please authenticate with valid token' })
    }
    try {

        const data = jwt.verify(token, JWT_SECRET)
        req.existingUser = data.existingUser;
        next();

    }
    catch (error) {
        console.error(error);
        res.status(401).send({ error: 'please authenticate with valid tokenn' })

    }

}

module.exports = fetchuser;