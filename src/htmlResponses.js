const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/styles.css`);
const js = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const serveFile = (response, file, contentType) => {
  response.writeHead(200, { contentType });
  response.write(file);
  response.end();
};

const getIndex = (request, response) => {
  serveFile(response, index, 'text/html');
};

const getCSS = (request, response) => {
  serveFile(response, css, 'text/css');
};

const getJS = (request, response) => {
  serveFile(response, js, 'application/javascript');
};

module.exports = {
  getIndex,
  getCSS,
  getJS,
};
