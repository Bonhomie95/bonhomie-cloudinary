/**
 * Compress image in browser using canvas
 */
export default function compressImageBrowser(
  file,
  maxWidth = 2000,
  maxHeight = 2000
) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      let { width, height } = img;

      // Resize if needed
      const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
      width = width * ratio;
      height = height * ratio;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          resolve({
            success: true,
            file: compressedFile,
          });
        },
        'image/jpeg',
        0.8 // Compression quality
      );
    };

    reader.onerror = () =>
      resolve({ success: false, error: 'FileReader failed' });
    reader.readAsDataURL(file);
  });
}
