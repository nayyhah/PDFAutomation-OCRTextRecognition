const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.cloudname,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'invoices',
        allowedFormats: ['jpeg', 'png', 'jpg', 'pdf']
    }
});

module.exports = {
    cloudinary,
    storage
}