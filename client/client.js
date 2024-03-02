const helper = require('./helper.js');

const init = (e) => {
    const navAddGal = document.getElementById('add-gal');
    const navAddImg = document.getElementById('add-img');
    const navDelGal = document.getElementById('del-gal');
    const navDelImg = document.getElementById('del-img');

    navAddGal.addEventListener('click', () => { buildForm(navAddGal.id); });
    navAddImg.addEventListener('click', () => { buildForm(navAddImg.id); });
    navDelGal.addEventListener('click', () => { buildForm(navDelGal.id); });
    navDelImg.addEventListener('click', () => { buildForm(navDelImg.id); });

    buildForm('add-gal');

    helper.getGalleries(helper.handlePageLoad);
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
        galForm.setAttribute('action', '/createGallery');
        galForm.setAttribute('method', 'post');
        galForm.setAttribute('class', 'input-form');;

        const galFormLabel = document.createElement('label');
        galFormLabel.setAttribute('for', 'galName');
        galFormLabel.appendChild(document.createTextNode('Gallery Name: '));

        const galFormName = document.createElement('input');
        galFormName.setAttribute('type', 'text');
        galFormName.setAttribute('name', 'galName');
        galFormName.setAttribute('id', 'gal-name-field');
        galFormName.setAttribute('class', 'text-field');

        const galFormSubmit = document.createElement('input');
        galFormSubmit.setAttribute('type', 'submit');
        galFormSubmit.setAttribute('value', 'Add Gallery');

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
        imgForm.setAttribute('action', '/addImage');
        imgForm.setAttribute('method', 'post');
        imgForm.setAttribute('class', 'input-form');;

        const formNameLabel = document.createElement('label');
        formNameLabel.setAttribute('for', 'imgName');
        formNameLabel.appendChild(document.createTextNode('Image Name: '));

        const formNameField = document.createElement('input');
        formNameField.setAttribute('type', 'text');
        formNameField.setAttribute('name', 'imgName');
        formNameField.setAttribute('id', 'img-name-field');
        formNameField.setAttribute('class', 'text-field');

        const formSourceLabel = document.createElement('label');
        formSourceLabel.setAttribute('for', 'imgSource');
        formSourceLabel.appendChild(document.createTextNode('Image Source: '));

        const formSourceField = document.createElement('input');
        formSourceField.setAttribute('type', 'text');
        formSourceField.setAttribute('name', 'imgSource');
        formSourceField.setAttribute('id', 'img-source-field');
        formSourceField.setAttribute('class', 'text-field');

        const formURLLabel = document.createElement('label');
        formURLLabel.setAttribute('for', 'imgURL');
        formURLLabel.appendChild(document.createTextNode('Image URL: '));

        const formURLField = document.createElement('input');
        formURLField.setAttribute('type', 'text');
        formURLField.setAttribute('name', 'imgURL');
        formURLField.setAttribute('id', 'img-url-field');
        formURLField.setAttribute('class', 'text-field');

        const imgFormSubmit = document.createElement('input');
        imgFormSubmit.setAttribute('type', 'submit');
        imgFormSubmit.setAttribute('value', 'Add Image');

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
    } else if (elementID === 'del-gal') {
        // 1.) Build all necessary elements.
        const formHeader = document.createElement('h3');
        formHeader.appendChild(document.createTextNode('Remove Gallery'));

        const galForm = document.createElement('form');
        galForm.setAttribute('action', '/removeGallery');
        galForm.setAttribute('method', 'post');
        galForm.setAttribute('class', 'input-form');;

        const galFormLabel = document.createElement('label');
        galFormLabel.setAttribute('for', 'galName');
        galFormLabel.appendChild(document.createTextNode('Gallery Name: '));

        const galFormName = document.createElement('input');
        galFormName.setAttribute('type', 'text');
        galFormName.setAttribute('name', 'galName');
        galFormName.setAttribute('id', 'gal-name-field');
        galFormName.setAttribute('class', 'text-field');

        const galFormSubmit = document.createElement('input');
        galFormSubmit.setAttribute('type', 'submit');
        galFormSubmit.setAttribute('value', 'Remove Gallery');

        // 2.) Append all inputs and labels to the form.
        galForm.appendChild(galFormLabel);
        galForm.appendChild(galFormName);
        galForm.appendChild(document.createElement('br'));
        galForm.appendChild(document.createElement('br'));
        galForm.appendChild(galFormSubmit);

        // 3.) Define server request function.
        const removeGal = (e) => {
            e.preventDefault();
            helper.sendGalleryRemoval(galForm);
            return false;
        };

        // 4.) Add submit event listener to the button.
        galForm.addEventListener('submit', removeGal);

        // 5.) Add header and form onto page.
        inputSec.appendChild(formHeader);
        inputSec.appendChild(galForm);
    } else if (elementID === 'del-img') {
        // 1.) Build all necessary elements.
        const formHeader = document.createElement('h3');
        formHeader.appendChild(document.createTextNode('Remove Image from Gallery'));

        const imgForm = document.createElement('form');
        imgForm.setAttribute('action', '/removeImage');
        imgForm.setAttribute('method', 'post');
        imgForm.setAttribute('class', 'input-form');;

        const imgFormLabel = document.createElement('label');
        imgFormLabel.setAttribute('for', 'imgName');
        imgFormLabel.appendChild(document.createTextNode('Image Name: '));

        const imgFormName = document.createElement('input');
        imgFormName.setAttribute('type', 'text');
        imgFormName.setAttribute('name', 'imgName');
        imgFormName.setAttribute('id', 'img-name-field');
        imgFormName.setAttribute('class', 'text-field');

        const imgFormSubmit = document.createElement('input');
        imgFormSubmit.setAttribute('type', 'submit');
        imgFormSubmit.setAttribute('value', 'Remove Image');

        // 2.) Append all inputs and labels to the form.
        imgForm.appendChild(imgFormLabel);
        imgForm.appendChild(imgFormName);
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(document.createElement('br'));
        imgForm.appendChild(imgFormSubmit);

        // 3.) Define server request function.
        const removeImage = (e) => {
            e.preventDefault();
            helper.sendImageRemoval(imgForm);
            return false;
        };

        // 4.) Add submit event listener to the button.
        imgForm.addEventListener('submit', removeImage);

        // 5.) Add header and form onto page.
        inputSec.appendChild(formHeader);
        inputSec.appendChild(imgForm);
    }
};

window.onload = init;