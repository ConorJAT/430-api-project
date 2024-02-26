/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\r\n\r\nconst init = (e) => {\r\n    const galForm = document.getElementById('galForm');\r\n    const imgForm = document.getElementById('imgForm');\r\n    const galBtn = document.getElementById('galBtn')\r\n\r\n    const createGal = (e) => {\r\n        e.preventDefault();\r\n        helper.sendGalleryPost(galForm);\r\n        return false;\r\n    };\r\n\r\n    const addImage = (e) => {\r\n        e.preventDefault();\r\n        helper.sendImagePost(imgForm);\r\n        return false;\r\n    };\r\n\r\n    galForm.addEventListener('submit', createGal);\r\n    imgForm.addEventListener('submit', addImage);\r\n    galBtn.addEventListener('click', helper.getGalleries);\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-api-project/./client/client.js?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("const handleResponse = async (response) => {\r\n    const responseText = await response.text();\r\n    console.log(responseText);\r\n\r\n    const parsedData = JSON.parse(responseText);\r\n\r\n    let galleries = parsedData.galleries;\r\n    let message = parsedData.message;\r\n\r\n    const galName = document.getElementById('createdGals').value;\r\n    const content = document.getElementById('content');\r\n\r\n    if (galleries) {\r\n        content.innerHTML = '';\r\n\r\n        for (let image in galImages) {\r\n            console.log(galImages[image]);\r\n            let newImg = document.createElement('img');\r\n            newImg.setAttribute('src', galImages[image].url);\r\n            newImg.setAttribute('class', 'galImage');\r\n            content.appendChild(newImg);\r\n        }\r\n    }\r\n};\r\n\r\nconst getGalleries = async () => {\r\n    const response = await fetch('/getGallery', { method: 'get'});\r\n\r\n    handleResponse(response);\r\n};\r\n\r\nconst sendGalleryPost = async (form) => {\r\n    const url = form.getAttribute('action');\r\n    const method = form.getAttribute('method');\r\n\r\n    const galName = document.getElementById('galNameField').value;\r\n\r\n    let isCreated = false;\r\n    const createdGals = document.getElementById('createdGals');\r\n    \r\n    for (let option of createdGals.childNodes) {\r\n        if (option.value == galName) { \r\n            isCreated = true; \r\n            break;\r\n        }\r\n    }\r\n\r\n    const formData = `galName=${galName}`;\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/x-www-form-urlenconded'\r\n        },\r\n        body: formData\r\n    });\r\n\r\n    handleResponse(response);\r\n\r\n    if (galName == '' || isCreated){ return; }\r\n\r\n    let newEntry = document.createElement('option');\r\n    newEntry.setAttribute('value', galName);\r\n    newEntry.appendChild(document.createTextNode(galName));\r\n    createdGals.appendChild(newEntry);\r\n};\r\n\r\nconst sendImagePost = async (form) => {\r\n    const url = form.getAttribute('action');\r\n    const method = form.getAttribute('method');\r\n\r\n    const imgName = document.getElementById('imgNameField').value;\r\n    const imgSource = document.getElementById('imgSourceField').value;\r\n    const imgURL = document.getElementById('imgURLField').value;\r\n    const galName = document.getElementById('createdGals').value;\r\n\r\n    const formData = `imgName=${imgName}&imgSource=${imgSource}&imgURL=${imgURL}&galName=${galName}`;\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/x-www-form-urlenconded'\r\n        },\r\n        body: formData\r\n    });\r\n\r\n    handleResponse(response);\r\n};\r\n\r\nmodule.exports = {\r\n    handleResponse,\r\n    getGalleries,\r\n    sendGalleryPost,\r\n    sendImagePost,\r\n};\n\n//# sourceURL=webpack://430-api-project/./client/helper.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/client.js");
/******/ 	
/******/ })()
;