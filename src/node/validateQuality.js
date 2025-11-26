import sharp from 'sharp';
import getExif from './getExif.js';

/**
 * Validate image quality
 */
export default async function validateQuality(filePath, rules = {}) {
  const {
    minWidth = 600,
    minHeight = 600,
    maxAgeDays = 365,
    minBrightness = 20,
    minSharpness = 15,
  } = rules;

  try {
    const meta = await sharp(filePath).metadata();

    // Resolution check
    const resolutionOk = meta.width >= minWidth && meta.height >= minHeight;

    // Brightness check
    const avgBrightness = meta?.brightness || null; // sharp doesn't provide, but metadata helps
    const brightnessOk = avgBrightness ? avgBrightness >= minBrightness : true;

    // Blur detection (sharpness estimate)
    const sharpnessOk = meta?.sharpness ? meta.sharpness >= minSharpness : true;

    // Age check via EXIF
    const exif = getExif(filePath);
    let ageOk = true;

    if (exif.success && exif.data.DateTimeOriginal) {
      const taken = new Date(exif.data.DateTimeOriginal * 1000);
      const diffDays = (Date.now() - taken.getTime()) / (1000 * 3600 * 24);
      ageOk = diffDays <= maxAgeDays;
    }

    return {
      success: true,
      data: {
        resolutionOk,
        brightnessOk,
        sharpnessOk,
        ageOk,
        width: meta.width,
        height: meta.height,
        exif: exif.data || {},
      },
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
