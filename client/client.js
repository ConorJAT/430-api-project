const helper = require('./helper.js');

const init = (e) => {
    const galForm = document.getElementById('galForm');
    const imgForm = document.getElementById('imgForm');
    const galBtn = document.getElementById('galBtn')

    const createGal = (e) => {
        e.preventDefault();
        helper.sendGalleryPost(galForm);
        return false;
    };

    const addImage = (e) => {
        e.preventDefault();
        helper.sendImagePost(imgForm);
        return false;
    };

    galForm.addEventListener('submit', createGal);
    imgForm.addEventListener('submit', addImage);
    galBtn.addEventListener('click', helper.getGalleries);
};

window.onload = init;