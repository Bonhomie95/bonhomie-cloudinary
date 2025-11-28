# 📦 @bonhomie/cloudinary-super-uploader

bugs fixed

<p align="center">
  <img src="https://img.shields.io/npm/v/@bonhomie/cloudinary-super-uploader?color=blue&label=npm%20version" />
  <img src="https://img.shields.io/npm/dm/@bonhomie/cloudinary-super-uploader?color=orange&label=downloads" />
  <img src="https://img.shields.io/bundlephobia/min/@bonhomie/cloudinary-super-uploader?color=yellow&label=minified%20size" />
  <img src="https://img.shields.io/github/license/bonhomie/cloudinary-super-uploader?color=green&label=license" />
</p>

<p align="center">
✨ A complete Cloudinary image upload toolkit for React + Node.  
Drag & drop uploader, browser compression, EXIF checks, duplicate detection, progress tracking, and backend helpers in one package.
</p>

---

## ✅ Features

### 🔹 React (Frontend)

- Drag & drop uploader
- Click-to-upload
- Live progress bar
- Thumbnail grid
- Drag-to-reorder images
- Browser-side compression (canvas)
- Duplicate detection (hashing)
- EXIF checks (e.g. old photos)
- Toast-style inline error messages
- Works with any upload endpoint (recommended: your Node backend)

### 🔹 Node.js (Backend)

- Upload single/multiple images to Cloudinary
- Sharp-based compression
- EXIF metadata extraction
- SHA-256 hashing + perceptual hash (pHash)
- Quality validation (resolution + EXIF date)
- Simple, explicit Cloudinary config

### 🔹 Browser Utilities

- Canvas-based compression
- EXIF extraction in the browser
- Minimum dimension validation
- SHA-1 hash for duplicate detection
- Thumbnail URL builder using Cloudinary transformations

---

## 📥 Installation

```bash
npm install @bonhomie/cloudinary-super-uploader
# or
yarn add @bonhomie/cloudinary-super-uploader



Frontend uploads → your backend (/api/upload) → backend uses uploadImage to Cloudinary:

import React from "react";
import {
  CloudinaryUploader,
} from "@bonhomie/cloudinary-super-uploader";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Upload property photos</h1>

      <CloudinaryUploader
        uploadUrl="/api/upload"         // your backend route
        maxWidth={2000}
        maxHeight={2000}
        minWidth={600}
        minHeight={600}
        maxFiles={10}
        allowedTypes={["image/jpeg", "image/png", "image/webp"]}
        autoCompress={true}
        maxAgeDays={365}
      />
    </div>
  );
}


The component will:
Validate dimensions
Compress large images (browser)
Read EXIF + hash
Skip duplicates
POST each file to uploadUrl as file in FormData
Expect a JSON response shaped like:

{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "folder/image-id",
    "width": 1200,
    "height": 800,
    "thumbnail": "https://res.cloudinary.com/.../c_fill,w_400,h_400/image.jpg"
  }
}

Usage – React Hook

If you prefer to build your own UI:

import React from "react";
import {
  useCloudinaryUpload,
} from "@bonhomie/cloudinary-super-uploader";

export default function CustomUploader() {
  const {
    images,
    progress,
    uploading,
    errors,
    upload,
    removeImage,
    reorderImages,
  } = useCloudinaryUpload({
    uploadUrl: "/api/upload",
    maxWidth: 2000,
    maxHeight: 2000,
    minWidth: 600,
    minHeight: 600,
    maxFiles: 10,
    maxAgeDays: 365,
  });

  const onSelectFiles = (e) => {
    upload(e.target.files);
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={onSelectFiles} />

      {uploading && (
        <div>
          <div style={{ width: `${progress}%`, height: 4, background: "blue" }} />
        </div>
      )}

      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {images.map((img) => (
          <div key={img.publicId} style={{ position: "relative" }}>
            <img src={img.thumbnail || img.url} alt="" />
            <button onClick={() => removeImage(img.publicId)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}


Usage – Node.js Backend
1. Single upload (uploadImage)

import express from "express";
import multer from "multer";
import {
  uploadImage,
} from "@bonhomie/cloudinary-super-uploader/node";

const upload = multer({ dest: "temp/" });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadImage(req.file.path, {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      folder: "uploads",
      tags: ["app-upload"],
    });

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;



2. Multiple uploads (uploadImages)
import {
  uploadImages,
} from "@bonhomie/cloudinary-super-uploader/node";

router.post("/upload-many", upload.array("files"), async (req, res) => {
  const filePaths = req.files.map((f) => f.path);

  const result = await uploadImages(filePaths, {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    folder: "multi",
  });

  res.json(result);
});


🧰 Browser Utilities


import {
  buildThumbnailUrl,
  compressImageBrowser,
  getExifBrowser,
  hashBrowser,
  validateDimensions,
} from "@bonhomie/cloudinary-super-uploader";

// Build a Cloudinary thumbnail URL
const thumb = buildThumbnailUrl(cloudinaryUrl, {
  width: 400,
  height: 400,
  crop: "fill",
});

// Validate dimensions
const dims = await validateDimensions(file, 600, 600);

// Compress
const compressed = await compressImageBrowser(file, 2000, 2000);

// EXIF
const exif = await getExifBrowser(file);

// Hash
const hash = await hashBrowser(file);


NODE UTILITIES:

import {
  compressImageNode,
  getExif,
  hashSHA256,
  hashPHash,
  validateQuality,
} from "@bonhomie/cloudinary-super-uploader/node";

const compressed = await compressImageNode("input.jpg", "output.jpg", {
  quality: 80,
  maxWidth: 2000,
  maxHeight: 2000,
});

const exif = getExif("output.jpg");

const sha = hashSHA256("output.jpg");
const pHash = await hashPHash("output.jpg");

const quality = await validateQuality("output.jpg", {
  minWidth: 600,
  minHeight: 600,
  maxAgeDays: 365,
});


| Option         | Default       | Description                          |
| -------------- | ------------- | ------------------------------------ |
| `uploadUrl`    | **required**  | Backend endpoint that accepts `file` |
| `maxWidth`     | `2000`        | Resize before upload (browser)       |
| `maxHeight`    | `2000`        | Resize before upload (browser)       |
| `minWidth`     | `600`         | Minimum allowed width                |
| `minHeight`    | `600`         | Minimum allowed height               |
| `maxFiles`     | `10`          | Max files per session                |
| `autoCompress` | `true`        | Enable browser compression           |
| `allowedTypes` | jpeg/png/webp | MIME types allowed                   |
| `maxAgeDays`   | `365`         | Warn if EXIF date is older           |



Signed Uploads (Advanced)
You already have generateSignature on the Node side.
Example (manual usage):

import {
  generateSignature,
} from "@bonhomie/cloudinary-super-uploader/node";

const params = {
  folder: "secure",
  timestamp: Math.floor(Date.now() / 1000),
};

const { signature } = generateSignature(params, process.env.CLOUDINARY_API_SECRET);



Then send signature, timestamp, and api_key to your frontend and call Cloudinary directly if desired.

📄 License

MIT — free for personal & commercial use.

🧑‍💻 Author
Built by Bonhomie
Full-stack Web & Mobile Developer.
If this package helps you, a ⭐ on GitHub would mean a lot.