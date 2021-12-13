const logger = (req,res, next) => {
    const method = `[${req.method}]`;
    const url = req.url;
    const year = new Date().getFullYear();
    console.log("Método: "+method);
    console.log("URL: "+url);
    console.log("Año: "+year);
    next(); 
}

module.exports = logger