const jwt = require('jsonwebtoken')
const secret = "teodoro"



function verifyJWT(req, res, next) {
    const token = req.query.id
    if (!token) {
        return res.status(401).json({ auth: false, message: 'É necessário fazer login para acessar esta página.' })
    }
    try {
        const decoded = jwt.verify(token, secret)
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(500).json({ auth: false, message: 'Sessão expirada. Faça login novamente.' })
    }
}







module.exports = {
    verifyJWT,
}