const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
    const body = [];

    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', () => {
        // application/x-www-form-urlencoded (key1=value1&key2=value2)
        const bodyString = Buffer.concat(body).toString();
        let bodyParams;

        if (request.headers['content-type'] === 'application/json') {
            bodyParams = JSON.parse(bodyString);
        } else {
            bodyParams = query.parse(bodyString);
        }

        handler(request, response, bodyParams);
  });
};

const urlStruct = {
    GET: {
        '/': htmlHandler.getIndex,
        '/styles.css': htmlHandler.getCSS,
        '/getGallery': jsonHandler.getGallery,
        notFound: jsonHandler.notFound
    },

    HEAD: {
        '/getGallery': jsonHandler.getGalleryMeta,
        notFound: jsonHandler.notFoundMeta
    },

    POST: {
        '/createGallery': parseBody,
        '/addImage': parseBody
    }
};

const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
  
    const methodHandler = urlStruct[request.method];
    if (!methodHandler) {
        urlStruct.HEAD.notFound(request, response);
    }
  
    const handlerFunc = methodHandler[parsedURL.pathname];

    if (handlerFunc) {
        handlerFunc(request, response, jsonHandler.addUser);
    } else {
        urlStruct.GET.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port, () => { console.log(`Listening on 127.0.0.1:${port}`); });