npm install @bonhomie/cloudinary-super-uploader

REACT

import React from "react";
import CloudinaryUploader from "@bonhomie/cloudinary-super-uploader/CloudinaryUploader";

export default function App() {
  return (
    <CloudinaryUploader
      uploadUrl="https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload"
      unsigned
      uploadPreset="YOUR_PRESET"
    />
  );
}
=================================================================================

NODE
import express from "express";
import multer from "multer";
import uploadImage from "@bonhomie/cloudinary-super-uploader/node/uploadImage.js";

const upload = multer({ dest: "temp/" });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  const result = await uploadImage(req.file.path, {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  return res.json(result);
});

export default router;

FRONTEND USAGE
<CloudinaryUploader uploadUrl="https://your-api.com/upload" />
===========================================================================

import useCloudinaryUpload from "@bonhomie/cloudinary-super-uploader/useCloudinaryUpload";

const {
  upload,
  images,
  progress,
  uploading,
  removeImage,
  reorderImages,
  errors
} = useCloudinaryUpload({
  uploadUrl: "YOUR_UPLOAD_URL",
  maxWidth: 2000,
  maxHeight: 2000,
  minWidth: 600,
  minHeight: 600,
  maxFiles: 10,
});
=================================================================
import CloudinaryUploader from "@bonhomie/cloudinary-super-uploader/CloudinaryUploader";

<CloudinaryUploader
  uploadUrl="/api/upload"
  maxFiles={5}
  autoCompress
/>

Drag & drop zone
Click-to-upload
Progress bar
Reorder by drag
Duplicate check
EXIF warnings (old photo, rotated, low resolution)
Thumbnail grid
Toast error messages


Browser Utilities:

CompressImageBrowser(file)
Compress image using canvas
getExifBrowser(file)
Extract EXIF metadata
validateDimensions(file, minW, minH)
Reject tiny images
hashBrowser(file)
Detect duplicate uploads

Node Utilities:

uploadImage(path, options)
Upload single image to Cloudinary
uploadImages(paths, options)
Batch upload
compressImageNode(input, output)
Server-side Sharp compression
getExif(path)
Extract metadata
hashSHA256(path)
Check duplicates
validateQuality(path)
Check resolution, brightness, blur, EXIF age




| Option       | Default      | Description          |
| ------------ | ------------ | -------------------- |
| maxWidth     | 2000         | Resize before upload |
| maxHeight    | 2000         | Resize before upload |
| minWidth     | 600          | Minimum allowed      |
| minHeight    | 600          | Minimum allowed      |
| maxFiles     | 10           | Max per upload       |
| autoCompress | true         | Browser compression  |
| allowedTypes | jpg/png/webp | File type filter     |
| maxAgeDays   | 365          | EXIF date warning    |

License:
MIT – free to use everywhere.

Author
Made with care by Bonhomie
Full-stack Web + Mobile Developer


<h1 align="center">@bonhomie/cloudinary-super-uploader</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/@bonhomie/cloudinary-super-uploader?color=blue&label=npm%20version" />
  <img src="https://img.shields.io/npm/dm/@bonhomie/cloudinary-super-uploader?color=orange&label=downloads" />
  <img src="https://img.shields.io/bundlephobia/min/@bonhomie/cloudinary-super-uploader?color=yellow&label=minified%20size" />
  <img src="https://img.shields.io/github/license/bonhomie/cloudinary-super-uploader?color=green&label=license" />
</p>

<p align="center">
  🚀 A professional React + Node Cloudinary upload toolkit with drag & drop, browser compression, EXIF checks, duplicate detection, signed uploads, and more.
</p>
