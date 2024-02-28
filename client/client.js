const helper = require('./helper.js');

const init = (e) => {
    const navAddGal = document.getElementById('add-gal');
    const navAddImg = document.getElementById('add-img');

    navAddGal.addEventListener('click', () => { buildForm(navAddGal.id); });
    navAddImg.addEventListener('click', () => { buildForm(navAddImg.id); });

    buildForm('add-gal');
};

const buildForm = (elementID) => {
    const inputSec = document.getElementById('user-input');
    inputSec.innerHTML = '';

    // Create Gallery Form
    if (elementID === 'add-gal'){
        // 1.) Build all necessary elements.
        const formHeader = document.createElement('h3');
        formHeader.appendChild(document.createTextNode('Create Gallery'));

        const galForm = document.createElement('form');
        galForm.action = '/createGallery';
        galForm.method = 'post';
        galForm.class = 'input-form';

        const galFormLabel = document.createElement('label');
        galFormLabel.for = 'galName';
        galFormLabel.appendChild(document.createTextNode('Gallery Name: '));

        const galFormName = document.createElement('input');
        galFormName.type = 'text';
        galFormName.name = 'galName';
        galFormName.id = 'gal-name-field';

        const galFormSubmit = document.createElement('input');
        galFormSubmit.type = 'submit';
        galFormSubmit.value = 'Add Gallery';

        // 2.) Append all inputs and labels to the form.
        galForm.appendChild(galFormLabel);
        galForm.appendChild(galFormName);
        galForm.appendChild(document.createElement('br'));
        galForm.appendChild(document.createElement('br'));
        galForm.appendChild(galFormSubmit);

        // 3.) Define server request function.
        const createGal = (e) => {
            e.preventDefault();
            helper.sendGalleryPost(galForm);
            return false;
        };

        // 4.) Add submit event listener to the button.
        galForm.addEventListener('submit', createGal);

        // 5.) Add header and form onto page.
        inputSec.appendChild(formHeader);
        inputSec.appendChild(galForm);

    // Add Image Form
    } else if (elementID === 'add-img') {
        // 1.) Build all necessary elements.
        const formHeader = document.createElement('h3');
        formHeader.appendChild(document.createTextNode('Add Image to Gallery'));

        const imgForm = document.createElement('form');
        imgForm.action = '/addImage';
        imgForm.method = 'post';
        imgForm.class = 'input-form';

        const formNameLabel = document.createElement('label');
        formNameLabel.for = 'imgName';
        formNameLabel.appendChild(document.createTextNode('Image Name: '));

        const formNameField = document.createElement('input');
        formNameField.type = 'text';
        formNameField.name = 'imgName';
        formNameField.id = 'img-name-field';

        const formSourceLabel = document.createElement('label');
        formSourceLabel.for = 'imgSource';
        formSourceLabel.appendChild(document.createTextNode('Image Source: '));

        const formSourceField = document.createElement('input');
        formSourceField.type = 'text';
        formSourceField.name = 'imgSource';
        formSourceField.id = 'img-source-field';

        const formURLLabel = document.createElement('label');
        formURLLabel.for = 'imgURL';
        formURLLabel.appendChild(document.createTextNode('Image URL: '));

        const formURLField = document.createElement('input');
        formURLField.type = 'text';
        formURLField.name = 'imgURL';
        formURLField.id = 'img-url-field';

        const imgFormSubmit = document.createElement('input');
        imgFormSubmit.type = 'submit';
        imgFormSubmit.value = 'Add Image';

        // 2.) Append all inputs and labels to the form.
        imgForm.appendChild(formNameLabel);
        imgForm.appendChild(formNameField);
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(formSourceLabel);
        imgForm.appendChild(formSourceField);
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(formURLLabel);
        imgForm.appendChild(formURLField);
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(imgFormSubmit);

        // 3.) Define server request function.
        const addImage = (e) => {
            e.preventDefault();
            helper.sendImagePost(imgForm);
            return false;
        };

        // 4.) Add submit event listener to the button.
        imgForm.addEventListener('submit', addImage);

        // 5.) Add header and form onto page.
        inputSec.appendChild(formHeader);
        inputSec.appendChild(imgForm);
    }
};

window.onload = init;