const generarHtmlArchivos = (files) => {
    let html = '';
    files.map((file, index) => {
        let filePath = file.path.split('public/')[1];
        const linkHtml = `<a href="http://localhost:8080/${filePath}">${file.fieldname}-${index+1}</a><br>`;
        html += linkHtml;
    });
    return html;
}

module.exports = {
    generarHtmlArchivos
}