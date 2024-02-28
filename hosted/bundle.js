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

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\r\n\r\nconst init = (e) => {\r\n    const navAddGal = document.getElementById('add-gal');\r\n    const navAddImg = document.getElementById('add-img');\r\n\r\n    navAddGal.addEventListener('click', () => { buildForm(navAddGal.id); });\r\n    navAddImg.addEventListener('click', () => { buildForm(navAddImg.id); });\r\n\r\n    buildForm('add-gal');\r\n};\r\n\r\nconst buildForm = (elementID) => {\r\n    const inputSec = document.getElementById('user-input');\r\n    inputSec.innerHTML = '';\r\n\r\n    // Create Gallery Form\r\n    if (elementID === 'add-gal'){\r\n        // 1.) Build all necessary elements.\r\n        const formHeader = document.createElement('h3');\r\n        formHeader.appendChild(document.createTextNode('Create Gallery'));\r\n\r\n        const galForm = document.createElement('form');\r\n        galForm.action = '/createGallery';\r\n        galForm.method = 'post';\r\n        galForm.class = 'input-form';\r\n\r\n        const galFormLabel = document.createElement('label');\r\n        galFormLabel.for = 'galName';\r\n        galFormLabel.appendChild(document.createTextNode('Gallery Name: '));\r\n\r\n        const galFormName = document.createElement('input');\r\n        galFormName.type = 'text';\r\n        galFormName.name = 'galName';\r\n        galFormName.id = 'gal-name-field';\r\n\r\n        const galFormSubmit = document.createElement('input');\r\n        galFormSubmit.type = 'submit';\r\n        galFormSubmit.value = 'Add Gallery';\r\n\r\n        // 2.) Append all inputs and labels to the form.\r\n        galForm.appendChild(galFormLabel);\r\n        galForm.appendChild(galFormName);\r\n        galForm.appendChild(document.createElement('br'));\r\n        galForm.appendChild(document.createElement('br'));\r\n        galForm.appendChild(galFormSubmit);\r\n\r\n        // 3.) Define server request function.\r\n        const createGal = (e) => {\r\n            e.preventDefault();\r\n            helper.sendGalleryPost(galForm);\r\n            return false;\r\n        };\r\n\r\n        // 4.) Add submit event listener to the button.\r\n        galForm.addEventListener('submit', createGal);\r\n\r\n        // 5.) Add header and form onto page.\r\n        inputSec.appendChild(formHeader);\r\n        inputSec.appendChild(galForm);\r\n\r\n    // Add Image Form\r\n    } else if (elementID === 'add-img') {\r\n        // 1.) Build all necessary elements.\r\n        const formHeader = document.createElement('h3');\r\n        formHeader.appendChild(document.createTextNode('Add Image to Gallery'));\r\n\r\n        const imgForm = document.createElement('form');\r\n        imgForm.action = '/addImage';\r\n        imgForm.method = 'post';\r\n        imgForm.class = 'input-form';\r\n\r\n        const formNameLabel = document.createElement('label');\r\n        formNameLabel.for = 'imgName';\r\n        formNameLabel.appendChild(document.createTextNode('Image Name: '));\r\n\r\n        const formNameField = document.createElement('input');\r\n        formNameField.type = 'text';\r\n        formNameField.name = 'imgName';\r\n        formNameField.id = 'img-name-field';\r\n\r\n        const formSourceLabel = document.createElement('label');\r\n        formSourceLabel.for = 'imgSource';\r\n        formSourceLabel.appendChild(document.createTextNode('Image Source: '));\r\n\r\n        const formSourceField = document.createElement('input');\r\n        formSourceField.type = 'text';\r\n        formSourceField.name = 'imgSource';\r\n        formSourceField.id = 'img-source-field';\r\n\r\n        const formURLLabel = document.createElement('label');\r\n        formURLLabel.for = 'imgURL';\r\n        formURLLabel.appendChild(document.createTextNode('Image URL: '));\r\n\r\n        const formURLField = document.createElement('input');\r\n        formURLField.type = 'text';\r\n        formURLField.name = 'imgURL';\r\n        formURLField.id = 'img-url-field';\r\n\r\n        const imgFormSubmit = document.createElement('input');\r\n        imgFormSubmit.type = 'submit';\r\n        imgFormSubmit.value = 'Add Image';\r\n\r\n        // 2.) Append all inputs and labels to the form.\r\n        imgForm.appendChild(formNameLabel);\r\n        imgForm.appendChild(formNameField);\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(formSourceLabel);\r\n        imgForm.appendChild(formSourceField);\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(formURLLabel);\r\n        imgForm.appendChild(formURLField);\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(document.createElement('br'));\r\n        imgForm.appendChild(imgFormSubmit);\r\n\r\n        // 3.) Define server request function.\r\n        const addImage = (e) => {\r\n            e.preventDefault();\r\n            helper.sendImagePost(imgForm);\r\n            return false;\r\n        };\r\n\r\n        // 4.) Add submit event listener to the button.\r\n        imgForm.addEventListener('submit', addImage);\r\n\r\n        // 5.) Add header and form onto page.\r\n        inputSec.appendChild(formHeader);\r\n        inputSec.appendChild(imgForm);\r\n    }\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-api-project/./client/client.js?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("const handleResponse = async (response) => {\r\n    const responseText = await response.text();\r\n    console.log(responseText);\r\n\r\n    const parsedData = JSON.parse(responseText);\r\n\r\n    let galleries = parsedData.galleries;\r\n    let message = parsedData.message;\r\n\r\n    const galName = document.getElementById('createdGals').value;\r\n    const content = document.getElementById('content');\r\n\r\n    if (galleries) {\r\n        content.innerHTML = '';\r\n\r\n        const galImages = galleries[`gal-${galName}`].images;\r\n\r\n        for (let image in galImages) {\r\n            let newImg = document.createElement('img');\r\n            newImg.setAttribute('src', galImages[image].url);\r\n            newImg.setAttribute('class', 'galImage');\r\n            content.appendChild(newImg);\r\n        }\r\n    }\r\n};\r\n\r\nconst getGalleries = async () => {\r\n    const response = await fetch('/getGallery', { method: 'get'});\r\n\r\n    handleResponse(response);\r\n};\r\n\r\nconst sendGalleryPost = async (form) => {\r\n    const url = form.getAttribute('action');\r\n    const method = form.getAttribute('method');\r\n\r\n    const galName = document.getElementById('gal-name-field').value;\r\n\r\n    // let isCreated = false;\r\n    // const createdGals = document.getElementById('createdGals');\r\n    \r\n    // for (let option of createdGals.childNodes) {\r\n    //     if (option.value == galName) { \r\n    //         isCreated = true; \r\n    //         break;\r\n    //     }\r\n    // }\r\n\r\n    const formData = `galName=${galName}`;\r\n\r\n    console.log(url + \" | \" + method + \" | \" + galName + \" | \" + formData);\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/x-www-form-urlenconded'\r\n        },\r\n        body: formData\r\n    });\r\n\r\n    handleResponse(response);\r\n\r\n    // if (galName == '' || isCreated){ return; }\r\n\r\n    // let newEntry = document.createElement('option');\r\n    // newEntry.setAttribute('value', galName);\r\n    // newEntry.appendChild(document.createTextNode(galName));\r\n    // createdGals.appendChild(newEntry);\r\n};\r\n\r\nconst sendImagePost = async (form) => {\r\n    const url = form.getAttribute('action');\r\n    const method = form.getAttribute('method');\r\n\r\n    const imgName = document.getElementById('img-name-field').value;\r\n    const imgSource = document.getElementById('img-source-field').value;\r\n    const imgURL = document.getElementById('img-url-field').value;\r\n    const galName = document.getElementById('createdGals').value;\r\n\r\n    const formData = `imgName=${imgName}&imgSource=${imgSource}&imgURL=${imgURL}&galName=${galName}`;\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/x-www-form-urlenconded'\r\n        },\r\n        body: formData\r\n    });\r\n\r\n    handleResponse(response);\r\n};\r\n\r\nmodule.exports = {\r\n    handleResponse,\r\n    getGalleries,\r\n    sendGalleryPost,\r\n    sendImagePost,\r\n};\n\n//# sourceURL=webpack://430-api-project/./client/helper.js?");

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