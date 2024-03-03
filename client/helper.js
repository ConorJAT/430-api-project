// handlePageLoad(response)
// - Response function that focuses on handling building
//   gallery divs from memory whenever the page loads or is
//   reloaded.
//
// response: Response returned from the server.
const handlePageLoad = async (response) => {
    // Convert response into text.
    const responseText = await response.text();

    // Parse response text into JSON.
    const parsedData = JSON.parse(responseText);

    // Retrieve galleries value.
    let galleries = parsedData.galleries;

    // If no galleries exist, log out message and return.
    if (!galleries) { 
        console.log('No galleries from server to display.')
        return; 
    }

    // Get the created galleries HTML container.
    const gallerySelect = document.getElementById('galleries');

    // For each gallery in galleries:
    for (let gallery in galleries){
        // Build new div element to represent gallery.
        const newGal = document.createElement('div');
        newGal.setAttribute('class', 'gallery');
        newGal.setAttribute('active', 'false');
        newGal.setAttribute('name', galleries[gallery].name);
        newGal.appendChild(document.createTextNode( galleries[gallery].name));

        // Set background color as NOT selected.
        newGal.style.backgroundColor = '#4DA871';

        // Add on click event listener that allows to click between galleries.
        newGal.addEventListener('click', () => {
            setGalleriesInactive(document.getElementById('galleries').childNodes);
            newGal.setAttribute('active', 'true');
            newGal.style.backgroundColor = '#3A7E55';
            getGalleries(handleImageResponse);
        });

        // Add gallery to client's created galleries.
        gallerySelect.appendChild(newGal)
    }

    // If there's at least one created gallery, set the first as active.
    if (gallerySelect.childNodes.length > 0) {
        gallerySelect.childNodes[0].setAttribute('active', 'true');
        gallerySelect.childNodes[0].style.backgroundColor = '#3A7E55';
    }

    // Update client side image display.
    getGalleries(handleImageResponse);
}

// handleImageResponse(response)
// - Response function that focuses on handling displaying
//   images to the user from the current selected gallery.
//
// response: Response returned from the server.
const handleImageResponse = async (response) => {
    // Convert response into text.
    const responseText = await response.text();

    // If response is just an empty string, return.
    if (responseText == '') { return; }

    // Parse response text into JSON.
    const parsedData = JSON.parse(responseText);

    // Retrieve galleries value.
    let galleries = parsedData.galleries;

    // Get the active gallery and retrieve its name.
    let galName = '';
    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);
    if (activeGal !== null) { galName = activeGal.getAttribute('name'); }

    // Get the image display container.
    const imgDisplay = document.getElementById('img-display');

    // If the galleries defined:
    if (galleries) {
        // Clear the image display section.
        imgDisplay.innerHTML = '';

        // Using galName, get the array of images that gallery holds.
        const galImages = galleries[`gal-${galName}`].images;

        // For each image, build an img tag and display it to the client.
        for (let image in galImages) {
            let newImg = document.createElement('img');
            newImg.setAttribute('src', galImages[image].url);
            newImg.setAttribute('class', 'galImage');
            imgDisplay.appendChild(newImg);
        }
    }
};

// handleUserResponse(response)
// - Response function that focuses on handling user
//   centered responses, primarily in the form of error
//   messages.
//
// response: Response returned from the server.
const handleUserResponse = async (response) => {
    // Convert response into text.
    const responseText = await response.text();

    // If response is just an empty string, return.
    if (responseText == '') { return; }

    // Parse response text into JSON.
    const parsedData = JSON.parse(responseText);

    // Retrieve message and ID values.
    let message = parsedData.message;
    let id = parsedData.id;

    // If an ID exists in the response, build an error alert.
    if (id) {
        let alertString = `ERROR: ${message}\n\nID: ${id}`;
        alert(alertString);
    
    // Else, just log out the response text.
    } else {
        console.log(responseText);
    }
};

// getGalleries(handlerFunc)
// - Request function that builds and sends requests
//   for retrieving gallery information from the server.
//
// handlerFunc: Function handler that dictates how the
//              data retrieved is used.
const getGalleries = async (handlerFunc) => {
    const response = await fetch('/getGallery', { method: 'get'});
    handlerFunc(response);
};

// sendGalleryPost(form)
// - Request function that builds and sends requests
//   for adding galleries to the server. Also creates
//   gallery divs as appropriate.
//
// form: Form from which the url, method and other info
//       are retrieved from.
const sendGalleryPost = async (form) => {
    // Get form method and action.
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    // Get any necessary form data.
    const galName = document.getElementById('gal-name-field').value;

    // Set variables to find if the gallery already exists.
    let isCreated = false;
    const createdGals = document.getElementById('galleries');

    // Find if the gallery already exists in the created galleries.
    for (let gallery of createdGals.childNodes) {
        if (gallery.getAttribute('name') == galName){
            isCreated = true;
            break;
        }
    }

    // Build the url encoded request via the form data.
    const formData = `galName=${galName}`;

    // Send fetch request.
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    // After fetch request gets something, handle the response.
    handleUserResponse(response);

    // If no user input provided OR if gallery in question does
    // exist, return from function.
    if (galName == '' || isCreated){ return; }

    // Set all galleries as inactive.
    setGalleriesInactive(createdGals.childNodes);

    // Build new div element to represent new gallery.
    const newGal = document.createElement('div');
    newGal.setAttribute('class', 'gallery');
    newGal.setAttribute('active', 'true');
    newGal.setAttribute('name', galName);
    newGal.appendChild(document.createTextNode(galName));

    // Set background color as selected.
    newGal.style.backgroundColor = '#3A7E55';

    // Add on click event listener that allows to click between galleries.
    newGal.addEventListener('click', () => {
        setGalleriesInactive(document.getElementById('galleries').childNodes);
        newGal.setAttribute('active', 'true');
        newGal.style.backgroundColor = '#3A7E55';
        getGalleries(handleImageResponse);
    });

    // Add new gallery to client's created galleries.
    createdGals.appendChild(newGal);

    // Update client side image display.
    getGalleries(handleImageResponse);
};

// sendImagePost(form)
// - Request function that builds and sends requests
//   for adding images to the server.
//
// form: Form from which the url, method and other info
//       are retrieved from.
const sendImagePost = async (form) => {
    // Get form method and action.
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    // Get any necessary form data.
    const imgName = document.getElementById('img-name-field').value;
    const imgSource = document.getElementById('img-source-field').value;
    const imgURL = document.getElementById('img-url-field').value;
    
    // Get the active gallery an image is being added to and retrieve its name.
    let galName = '';
    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);
    if (activeGal != null) { galName = activeGal.getAttribute('name'); }

    // Build the url encoded request via the form data and gallery name.
    const formData = `imgName=${imgName}&imgSource=${imgSource}&imgURL=${imgURL}&galName=${galName}`;

    // Send fetch request.
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    // After fetch request gets something, handle the response.
    handleUserResponse(response);

    // Update client side image display.
    getGalleries(handleImageResponse);
};

// sendGalleryRemoval(form)
// - Request function that builds and sends requests
//   for gallery deletion to the server. Also removes
//   gallery divs as appropriate.
//
// form: Form from which the url, method and other info
//       are retrieved from.
const sendGalleryRemoval = async (form) => {
    // Get form method and action.
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    // Get any necessary form data.
    const galName = document.getElementById('gal-name-field').value;

    // Set variables to find the gallery to remove.
    let isCreated = false;
    let galToRemove = null;
    const createdGals = document.getElementById('galleries');

    // Find the gallery to remove in the created galleries.
    for (let gallery of createdGals.childNodes) {
        if (gallery.getAttribute('name') == galName){
            isCreated = true;
            galToRemove = gallery;
            break;
        }
    }

    // Build the url encoded request via the form data.
    const formData = `galName=${galName}`;

    // Send fetch request.
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    // After fetch request gets something, handle the response.
    handleUserResponse(response);

    // If no user input provided OR if gallery in question doesn't
    // exist, return from function.
    if (galName == '' || !isCreated){ return; }

    // If gallery is active, is NOT the only one, AND is the first one in the list:
    if (galToRemove.getAttribute('active') === 'true' && createdGals.childNodes.length > 1 && createdGals.childNodes[0] == galToRemove) {
        galToRemove.nextSibling.setAttribute('active', 'true');
        galToRemove.nextSibling.style.backgroundColor = '#3A7E55';
        
    // Else, if gallery is just active:
    } else if (galToRemove.getAttribute('active') === 'true') {
        createdGals.childNodes[0].setAttribute('active', 'true');
        createdGals.childNodes[0].style.backgroundColor = '#3A7E55';
    }

    // Remove the gallery from the client side list.
    createdGals.removeChild(galToRemove);

    // Update client side image display.
    getGalleries(handleImageResponse);

    // If no galleries exist, clear the image display.
    if (createdGals.childNodes.length == 0) {
        document.getElementById('img-display').innerHTML = '';
    }
};

// sendImageRemoval(form)
// - Request function that builds and sends requests
//   for image deletion to the server.
//
// form: Form from which the url, method and other info
//       are retrieved from.
const sendImageRemoval = async (form) => {
    // Get form method and action.
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    // Get any necessary form data.
    const imgName = document.getElementById('img-name-field').value;

    // Get the active gallery an image is being removed from and retrieve its name.
    let galName = '';
    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);
    if (activeGal != null) { galName = activeGal.getAttribute('name'); }

    // Build the url encoded request via the form data and gallery name.
    const formData = `imgName=${imgName}&galName=${galName}`;

    // Send fetch request.
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    // After fetch request gets something, handle the response.
    handleUserResponse(response);

    // Update client side image display.
    getGalleries(handleImageResponse);
};

// getActiveGallery(galleries)
// - Helper function that finds the current active gallery
//   and returns it.
//
// galleries: List of created gallery div elements.
const getActiveGallery = (galleries) => {
    for (let gallery of galleries) {
        if (gallery.getAttribute('active') === 'true') { return gallery; }
    }

    return null;
};

// setGalleriesInactive(galleries)
// - Helper function that sets all galleries in the created
//   galleries section to inactive with the inactive color.
//
// galleries: List of created gallery div elements.
const setGalleriesInactive = (galleries) => {
    for (let gallery of galleries) { 
        gallery.setAttribute('active', 'false'); 
        gallery.style.backgroundColor = '#4DA871';
    }
};

// Export all request functions for client.js.
module.exports = {
    getGalleries,
    handlePageLoad,
    sendGalleryPost,
    sendImagePost,
    sendGalleryRemoval,
    sendImageRemoval
};