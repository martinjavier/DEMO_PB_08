const express = require('express');
const multer = require('multer');
const path = require('path');
const { generarHtmlArchivos } = require('../../utils/app.utils')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/uploads')},
    filename: (req, file, cb) => { 
        const extension = file.mimetype.split('/')[1];
        cb(null, `${file.filename}-${Date.now()}.${extension}`)}
  })
  
const upload = multer({ storage })

router.post('/archivo', upload.single('archivo'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Debes cargar un archivo')
        error.httpStatusCode = 400;
        return next()
    } else {
        res.sendFile(path.resolve(__dirname, `../../public/uploads/${file.filename}`));
    }
})

router.post('/archivos', upload.array('archivos', 5), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Debes cargar tus archivos')
        error.httpStatusCode = 400;
        return next()
    } else {
        const html = generarHtmlArchivos(files);
        res.json(html);
    }
})

module.exports = router
