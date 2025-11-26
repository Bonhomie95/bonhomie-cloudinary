import sharp from "sharp";

/**
 * Compress image using Sharp
 */
export default async function compressImageNode(inputPath, outputPath, options = {}) {
  const {
    quality = 80,
    maxWidth = 2000,
    maxHeight = 2000,
    format = "jpeg",
    removeMetadata = true,
  } = options;

  try {
    let pipeline = sharp(inputPath).rotate();

    // Resize only if needed
    pipeline = pipeline.resize({
      width: maxWidth,
      height: maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    });

    if (removeMetadata) {
      pipeline = pipeline.withMetadata({ exif: false });
    }

    if (format === "jpeg") pipeline = pipeline.jpeg({ quality });
    if (format === "png") pipeline = pipeline.png({ quality });
    if (format === "webp") pipeline = pipeline.webp({ quality });

    await pipeline.toFile(outputPath);

    return { success: true, output: outputPath };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
