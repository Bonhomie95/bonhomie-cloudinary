import cloudinary from 'cloudinary';
import generateSignature from './generateSignature.js';

/**
 * Upload a single image to Cloudinary
 */
export default async function uploadImage(filePath, options = {}) {
  const {
    cloud_name,
    api_key,
    api_secret,
    folder = 'uploads',
    public_id,
    useSigned = false,
    transformation = {},
    tags = [],
    resource_type = 'image',
  } = options;

  try {
    cloudinary.v2.config({
      cloud_name,
      api_key,
      api_secret,
    });

    let uploadOptions = {
      folder,
      public_id,
      tags,
      resource_type,
      transformation,
    };

    // SIGNED UPLOAD
    if (useSigned) {
      const timestamp = Math.floor(Date.now() / 1000);

      const signatureParams = {
        timestamp,
        folder,
        public_id,
        ...transformation,
      };

      const sigResult = generateSignature(signatureParams, api_secret);

      if (!sigResult.success) throw new Error(sigResult.error);

      uploadOptions = {
        ...uploadOptions,
        timestamp,
        signature: sigResult.signature,
        api_key,
      };
    }

    const result = await cloudinary.v2.uploader.upload(filePath, uploadOptions);

    return {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
        format: result.format,
        folder: result.folder,
        etag: result.etag,
      },
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
