const handleResponse = async (response) => {
    const responseText = await response.text();
    console.log(responseText);

    const parsedData = JSON.parse(responseText);

    let galleries = parsedData.galleries;
    let message = parsedData.message;

    const activeGal = getActiveGallery(document.getElementById('galleries').childNodes);

    let galName = '';
    if (activeGal !== null) { galName = activeGal.getAttribute('name'); }

    const imgDisplay = document.getElementById('img-display');
    
    // const galName = document.getElementById('createdGals').value;
    // const content = document.getElementById('content');

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

const getGalleries = async () => {
    const response = await fetch('/getGallery', { method: 'get'});

    handleResponse(response);
};

const sendGalleryPost = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const galName = document.getElementById('gal-name-field').value;

    let isCreated = false;
    const createdGals = document.getElementById('galleries');

    for (let gallery of createdGals.childNodes) {
        if (gallery.name == galName){
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

    handleResponse(response);

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
        getGalleries();
    });

    createdGals.appendChild(newGal)
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

    handleResponse(response);
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
    handleResponse,
    getGalleries,
    sendGalleryPost,
    sendImagePost,
};