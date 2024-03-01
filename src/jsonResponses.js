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

const getGallery = (request, response) => {
  // If no galleries exist yet, respond with 400 error response.
  if (JSON.stringify(galleries) === '{}') {
    const errorResponse = {
      message: 'No galleries created; cannot perform retrieval.',
      id: 'noGalleriesToRetrieve',
    };
    return respondJSON(request, response, 400, JSON.stringify(errorResponse));
  }

  // Set up response JSON.
  const responseJSON = { galleries };

  // Respond with all galleries and response code 200.
  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

const getGalleryMeta = (request, response) => {
  // Respond with response code of 200.
  respondJSONMeta(request, response, 200);
};

const createGallery = (request, response, body) => {
  // Set up response JSON.
  const responseJSON = {
    message: 'Name required to create gallery.',
  };

  // If no gallery name parameter, then respond with 400 error.
  if (!body.galName) {
    responseJSON.id = 'createGalleryMissingParam';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  let responseCode = 404;

  // If gallery does not exist under name provided, create one and set up for 201 response.
  if (!galleries[`gal-${body.galName}`]) {
    responseCode = 201;

    const creationDate = new Date(Date.now());

    galleries[`gal-${body.galName}`] = {
      name: body.galName,
      created: creationDate.toDateString(),
      images: {},
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
    message: 'Name and URL required to add image.',
  };

  // If no image name or url parameters, then respond with 400 error.
  if (!body.imgName || !body.imgURL) {
    responseJSON.id = 'addImageMissingParams';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  if (JSON.stringify(galleries) === '{}') {
    responseJSON.message = 'No galleries created; Create a gallery to add an image.';
    responseJSON.id = 'noGalleriesCreated';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  let responseCode = 204;

  // If image does not exist under name provided, add it to selected
  // gallery and set up for 201 response.
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

const removeGallery = (request, response, body) => {
  const responseJSON = {
    message: 'Name required to remove gallery.',
  };

  if (!body.galName) {
    responseJSON.id = 'removeGalleryMissingParam';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  if (!galleries[`gal-${body.galName}`] || JSON.stringify(galleries) === '{}') {
    responseJSON.message = `Gallery under the name of '${body.galName}' does not exist and cannot be deleted.`;
    responseJSON.id = 'galleryDoesNotExist';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  delete galleries[`gal-${body.galName}`];

  responseJSON.message = `Successfully deleted gallery named '${body.galName}'.`;
  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

const removeImage = (request, response, body) => {
  const responseJSON = {
    message: 'Name required to remove image.',
  };

  if (!body.imgName) {
    responseJSON.id = 'removeImageMissingParam';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  if (JSON.stringify(galleries) === '{}') {
    responseJSON.message = 'No galleries created; No images to be removed.';
    responseJSON.id = 'noGalleriesCreated';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  if (!galleries[`gal-${body.galName}`].images[`img-${body.imgName}`]) {
    responseJSON.message = `Image name '${body.imgName}' does not exist in this gallery.`;
    responseJSON.id = 'imageDoesNotExist';
    return respondJSON(request, response, 400, JSON.stringify(responseJSON));
  }

  delete galleries[`gal-${body.galName}`].images[`img-${body.imgName}`];

  responseJSON.message = `Successfully deleted image name '${body.imgName}' from gallery.`;
  return respondJSON(request, response, 200, JSON.stringify(responseJSON));
};

const notFound = (request, response) => {
  const responseJSON = { message: 'The page you were looking for could not be found.', id: 'contentNotFound' };

  respondJSON(request, response, 404, JSON.stringify(responseJSON));
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getGallery,
  getGalleryMeta,
  createGallery,
  addImage,
  removeGallery,
  removeImage,
  notFound,
  notFoundMeta,
};
