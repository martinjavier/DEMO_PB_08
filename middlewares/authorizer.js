const { usuarios} = require('../data/data');

const authorizer = (req, res, next) => {
    const { id } = req.query;
    const user = usuarios.find(usuario => usuario.id === +id);
    if (user) {
        req.user = user;
        return next();
    }
    return res.status(401).send('<h1 style="color:red;">UNAUTHORIZED</h1>')
}

module.exports = authorizer