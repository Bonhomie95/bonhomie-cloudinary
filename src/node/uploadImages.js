import uploadImage from "./uploadImage.js";

/**
 * Upload multiple images (parallel-safe)
 */
export default async function uploadImages(files, options = {}) {
  try {
    const uploads = await Promise.all(
      files.map(async (filePath) => {
        const res = await uploadImage(filePath, options);
        return {
          file: filePath,
          ...res,
        };
      })
    );

    return { success: true, data: uploads };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
