// Data Structure:
// 
// {
//  gallery: {
//      name: string,
//      create-date: date,
//      images: {
//          image: {
//              name: string,
//              source: string,
//              url: string    
//          }
//      }
//  }
// }

const galleries = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(object);
    response.end();
};
  
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

const getGallery = (request, response, body) => {
    // Set up response JSON.
    const responseJSON = {};

    // If no gallery name was provided, respond with 400 error.
    if (!body.galName) {
        responseJSON.message = 'Name required to get existing gallery.';
        responseJSON.id = 'getGalleryMissingParam';
        return respondJSON(request, response, 400, JSON.stringify(responseJSON));

    // If galleries does not contain gallery of name parameter, respond with separate 400 error.
    } else if (!galleries[`gal-${body.galName}`]) {
        responseJSON.message = `Could not find gallery under the name of '${body.galName}'.`;
        responseJSON.id = 'galleryNotFound';
        return respondJSON(request, response, 400, JSON.stringify(responseJSON));
    }

    // Else, put the gallery in a response object.
    responseJSON.gallery = galleries[`gal-${body.galName}`];

    // Respond with gallery and response code 200.
    return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

const getGalleryMeta = (request, response, body) => {
    // If no gallery name was provided OR if galleries does not contain gallery of name
    // parameter, respond with a 400 error head/meta response.
    if (!body.galName || !galleries[`gal-${body.galName}`]) {
        return respondJSONMeta(request, response, 400);
    }

    // Else respond with response code of 200.
    return respondJSONMeta(request, response, 200);
};

const createGallery = (request, response, body) => {
    // Set up response JSON.
    const responseJSON = {
        message: 'Name required to create gallery.'
    };

    // If no gallery name parameter, then respond with 400 error. 
    if (!body.galName){
        responseJSON.id = 'createGalleryMissingParam';
        return respondJSON(request, response, 400, JSON.stringify(responseJSON));
    }

    let responseCode = 404;

    // If gallery does not exist under name provided, create one and set up for 201 response.
    if (!galleries[`gal-${body.galName}`]) {
        responseCode = 201;
        galleries[`gal-${body.galName}`] = {
            name: body.galName,
            created: Date.now.toString(),
            images: {}
        };

        responseJSON.message = 'New gallery successfully created.';

    // Else, if the gallery already, set up for 400 bad request.
    } else {
        responseCode = 400;
        responseJSON.message = `Gallery under the name of '${body.galName}' already exists.`;
        responseJSON.id = 'galleryAlreadyExists';
    }

    // Return the response.
    return respondJSON(request, response, responseCode, JSON.stringify(responseJSON));
};

const addImage = (request, response, body) => {
    // Set up response JSON.
    const responseJSON = {
        message: 'Name and URL required to add image.'
    };

    // If no image name or url parameters, then respond with 400 error.
    if (!body.imgName || !body.imgURL) {
        responseJSON.id = 'addImageMissingParams';
        return respondJSON(request, response, 400, JSON.stringify(responseJSON));
    }

    let responseCode = 204;

    // If image does not exist under name provided, add it to selected gallery and set up for 201 response.
    if (!galleries[`gal-${body.galName}`].images[`img-${body.imgName}`]) {
        responseCode = 201;
        galleries[`gal-${body.galName}`].images[`img-${body.imgName}`] = {};

        responseJSON.message = `New image successfully added to '${body.galName}'.`;
    }

    // Add (or update) all necessary data to new image object.
    galleries[`gal-${body.galName}`].images[`img-${body.imgName}`].name = body.imgName;
    galleries[`gal-${body.galName}`].images[`img-${body.imgName}`].url = body.imgURL;
    if (body.imgSource) {
        galleries[`gal-${body.galName}`].images[`img-${body.imgName}`].source = body.imgSource;
    } else {
        galleries[`gal-${body.galName}`].images[`img-${body.imgName}`].source = 'N/A';
    }

    // If not a new image, respond with 204 meta response.
    if (responseCode === 204) {
        return respondJSONMeta(request, response, 204);
    }
    
    // Else, respond with 201 response/
    return respondJSON(request, response, 201, JSON.stringify(responseJSON));
};

const notFound = (request, response) => {
    const responseJSON = { message: 'The page you were looking for could not be found.', id: 'contentNotFound' };

    respondJSON(request, response, 404, JSON.stringify(responseJSON));
};

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
}

module.exports = {
    getGallery,
    getGalleryMeta,
    createGallery,
    addImage,
    notFound,
    notFoundMeta,
};