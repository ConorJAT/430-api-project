const handleResponse = async (response) => {
    const responseText = await response.text();
    console.log(responseText);

    const parsedData = JSON.parse(responseText);

    let galleries = parsedData.galleries;
    let message = parsedData.message;

    const galName = document.getElementById('createdGals').value;
    const content = document.getElementById('content');

    if (galleries) {
        content.innerHTML = '';

        const galImages = galleries[`gal-${galName}`].images;

        for (let image in galImages) {
            let newImg = document.createElement('img');
            newImg.setAttribute('src', galImages[image].url);
            newImg.setAttribute('class', 'galImage');
            content.appendChild(newImg);
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

    // let isCreated = false;
    // const createdGals = document.getElementById('createdGals');
    
    // for (let option of createdGals.childNodes) {
    //     if (option.value == galName) { 
    //         isCreated = true; 
    //         break;
    //     }
    // }

    const formData = `galName=${galName}`;

    console.log(url + " | " + method + " | " + galName + " | " + formData);

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlenconded'
        },
        body: formData
    });

    handleResponse(response);

    // if (galName == '' || isCreated){ return; }

    // let newEntry = document.createElement('option');
    // newEntry.setAttribute('value', galName);
    // newEntry.appendChild(document.createTextNode(galName));
    // createdGals.appendChild(newEntry);
};

const sendImagePost = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const imgName = document.getElementById('img-name-field').value;
    const imgSource = document.getElementById('img-source-field').value;
    const imgURL = document.getElementById('img-url-field').value;
    const galName = document.getElementById('createdGals').value;

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

module.exports = {
    handleResponse,
    getGalleries,
    sendGalleryPost,
    sendImagePost,
};