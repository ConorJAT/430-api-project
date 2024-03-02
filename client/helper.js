const handlePageLoad = async (response) => {
    const responseText = await response.text();

    const parsedData = JSON.parse(responseText);

    let galleries = parsedData.galleries;
    if (!galleries) { 
        console.log('No galleries from server to display.')
        return; 
    }

    const gallerySelect = document.getElementById('galleries');

    for (let gallery in galleries){
        const newGal = document.createElement('div');
        newGal.setAttribute('class', 'gallery');
        newGal.setAttribute('active', 'false');
        newGal.setAttribute('name', galleries[gallery].name);
        newGal.appendChild(document.createTextNode( galleries[gallery].name));

        newGal.style.backgroundColor = 'antiquewhite';

        newGal.addEventListener('click', () => {
            setGalleriesInactive(document.getElementById('galleries').childNodes);
            newGal.setAttribute('active', 'true');
            newGal.style.backgroundColor = 'rgb(201, 189, 174)';
            getGalleries(handleImageResponse);
        });

        gallerySelect.appendChild(newGal)
    }

    if (gallerySelect.childNodes.length > 0) {
        gallerySelect.childNodes[0].setAttribute('active', 'true');
        gallerySelect.childNodes[0].style.backgroundColor = 'rgb(201, 189, 174)';
    }

    getGalleries(handleImageResponse);
}

const handleUserResponse = async (response) => {
    const responseText = await response.text();

    if (responseText == '') { return; }

    const parsedData = JSON.parse(responseText);

    let message = parsedData.message;
    let id = parsedData.id;

    if (id) {
        let alertString = `ERROR: ${message}\n\nID: ${id}`;
        alert(alertString);
    } else {
        console.log(responseText);
    }
};

const handleImageResponse = async (response) => {
    const responseText = await response.text();
    //console.log(responseText);

    if (responseText == '') { return; }

    const parsedData = JSON.parse(responseText);

    let galleries = parsedData.galleries;

    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);

    let galName = '';
    if (activeGal !== null) { galName = activeGal.getAttribute('name'); }

    const imgDisplay = document.getElementById('img-display');

    if (galleries) {
        imgDisplay.innerHTML = '';

        const galImages = galleries[`gal-${galName}`].images;

        for (let image in galImages) {
            let newImg = document.createElement('img');
            newImg.setAttribute('src', galImages[image].url);
            newImg.setAttribute('class', 'galImage');
            imgDisplay.appendChild(newImg);
        }
    }
};

const getGalleries = async (handlerFunc) => {
    const response = await fetch('/getGallery', { method: 'get'});
    handlerFunc(response);
};

const sendGalleryPost = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const galName = document.getElementById('gal-name-field').value;

    let isCreated = false;
    const createdGals = document.getElementById('galleries');

    for (let gallery of createdGals.childNodes) {
        if (gallery.getAttribute('name') == galName){
            isCreated = true;
            break;
        }
    }

    const formData = `galName=${galName}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    handleUserResponse(response);

    if (galName == '' || isCreated){ return; }

    setGalleriesInactive(createdGals.childNodes);

    const newGal = document.createElement('div');
    newGal.setAttribute('class', 'gallery');
    newGal.setAttribute('active', 'true');
    newGal.setAttribute('name', galName);
    newGal.appendChild(document.createTextNode(galName));

    newGal.style.backgroundColor = 'rgb(201, 189, 174)';

    newGal.addEventListener('click', () => {
        setGalleriesInactive(document.getElementById('galleries').childNodes);
        newGal.setAttribute('active', 'true');
        newGal.style.backgroundColor = 'rgb(201, 189, 174)';
        getGalleries(handleImageResponse);
    });

    createdGals.appendChild(newGal);

    getGalleries(handleImageResponse);
};

const sendImagePost = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const imgName = document.getElementById('img-name-field').value;
    const imgSource = document.getElementById('img-source-field').value;
    const imgURL = document.getElementById('img-url-field').value;
    
    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);

    let galName = '';
    if (activeGal != null) { galName = activeGal.getAttribute('name'); }

    const formData = `imgName=${imgName}&imgSource=${imgSource}&imgURL=${imgURL}&galName=${galName}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    handleUserResponse(response);

    getGalleries(handleImageResponse);
};

const sendGalleryRemoval = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const galName = document.getElementById('gal-name-field').value;

    let isCreated = false;
    const createdGals = document.getElementById('galleries');
    let galToRemove = null;

    for (let gallery of createdGals.childNodes) {
        if (gallery.getAttribute('name') == galName){
            isCreated = true;
            galToRemove = gallery;
            break;
        }
    }

    const formData = `galName=${galName}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    handleUserResponse(response);

    if (galName == '' || !isCreated){ return; }

    if (galToRemove.getAttribute('active') === 'true' && createdGals.childNodes.length > 1 && createdGals.childNodes[0] == galToRemove) {
        galToRemove.nextSibling.setAttribute('active', 'true');
        galToRemove.nextSibling.style.backgroundColor = 'rgb(201, 189, 174)';
        
    } else if (galToRemove.getAttribute('active') === 'true') {
        createdGals.childNodes[0].setAttribute('active', 'true');
        createdGals.childNodes[0].style.backgroundColor = 'rgb(201, 189, 174)';
    }

    createdGals.removeChild(galToRemove);

    getGalleries(handleImageResponse);

    if (createdGals.childNodes.length == 0) {
        document.getElementById('img-display').innerHTML = '';
    }
};

const sendImageRemoval = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const imgName = document.getElementById('img-name-field').value;

    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);

    let galName = '';
    if (activeGal != null) { galName = activeGal.getAttribute('name'); }

    const formData = `imgName=${imgName}&galName=${galName}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    handleUserResponse(response);

    getGalleries(handleImageResponse);
};

const getActiveGallery = (galleries) => {
    for (let gallery of galleries) {
        if (gallery.getAttribute('active') === 'true') { return gallery; }
    }

    return null;
};

const setGalleriesInactive = (galleries) => {
    for (let gallery of galleries) { 
        gallery.setAttribute('active', 'false'); 
        gallery.style.backgroundColor = 'antiquewhite';
    }
};

module.exports = {
    getGalleries,
    handlePageLoad,
    sendGalleryPost,
    sendImagePost,
    sendGalleryRemoval,
    sendImageRemoval
};