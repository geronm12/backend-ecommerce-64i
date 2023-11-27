const cloud = require("cloudinary");

const cloudinary = cloud.v2;

function configCloudinary(cloud_name, api_key, api_secret) {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

//ubicación relativa
async function UploadPicture(file) {
  try {
    const { path } = file;

    const res = await cloudinary.uploader.upload(path, {
      resource_type: "image",
    });

    return res;
  } catch (ex) {
    console.log(ex);
  }
}

module.exports = {
  UploadPicture,
  configCloudinary,
};
