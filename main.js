const http = require('http');
const url = require('url');
const fs = require('fs');

let getTemplate = (req, res, path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    });
}

let handlers = {};
handlers.home = (req, res) => {
    getTemplate(req, res, 'view/home.html');
}
handlers.register = (req, res) => {
    getTemplate(req, res, 'view/register.html');
}
handlers.login = (req, res) => {
    getTemplate(req, res, 'view/login.html');
}
handlers.notFound = (req, res) => {
    getTemplate(req, res, 'view/error.html');
}

let router = {
    'register': handlers.register,
    'login': handlers.login,
    '': handlers.home
}


http.createServer((req, res) => {
    let urlParse = url.parse(req.url, true);
    let path = urlParse.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler;
    if (typeof router[trimPath] === "undefined") {
        chosenHandler = handlers.notFound;
    } else {
        chosenHandler = router[trimPath];
    }
    chosenHandler(req, res);

}).listen(3000, () => {
    console.log('localhost3000');
})
