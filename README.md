# 📦 **@bonhomie/cloudinary-super-uploader**

<p align="center">
  <img src="https://img.shields.io/npm/v/@bonhomie/cloudinary-super-uploader?color=blue&label=npm%20version" />
  <img src="https://img.shields.io/npm/dm/@bonhomie/cloudinary-super-uploader?color=orange&label=downloads" />
  <img src="https://img.shields.io/bundlephobia/min/@bonhomie/cloudinary-super-uploader?color=yellow&label=minified%20size" />
  <img src="https://img.shields.io/github/license/bonhomie/cloudinary-super-uploader?color=green&label=license" />
</p>

<p align="center">  
✨ A complete Cloudinary image upload toolkit for React + Node.  
Includes drag & drop uploader, browser compression, EXIF validation, duplicate detection, progress tracking, server utilities, and more.  
</p>

---

# ✅ Features

### **React**

* Drag & drop uploader
* Click-to-upload
* Live progress bar
* Thumbnail grid
* Reorder images (drag)
* Auto browser compression
* Duplicate image detection
* EXIF checks (old images, rotated, low-resolution)
* Clean UI + toast errors
* Works with unsigned OR server-signed uploads

### **Node.js**

* Upload single/multiple images
* Sharp compression
* EXIF metadata extraction
* SHA-256 hashing (duplicate detection)
* Auto-tagging
* Quality validation
* Easy Cloudinary config

### **Browser Utilities**

* Compress image via canvas
* Read EXIF date/time/orientation
* Validate dimensions
* Detect duplicates (hashing)

### **Node Utilities**

* Compress image
* Extract EXIF
* Validate quality
* Upload safely
* Hash files

---

# 📥 Installation

```bash
npm install @bonhomie/cloudinary-super-uploader
```

or

```bash
yarn add @bonhomie/cloudinary-super-uploader
```

---

# ⚛️ **Usage — React Component**

### **CloudinaryUploader Component**

```jsx
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
```

### Or use your own backend:

```jsx
<CloudinaryUploader uploadUrl="https://your-api.com/upload" />
```

---

# ⚛️ **Usage — React Hook**

```jsx
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
  uploadUrl: "/api/upload",
  maxWidth: 2000,
  maxHeight: 2000,
  minWidth: 600,
  minHeight: 600,
  maxFiles: 10,
});
```

---

# 🖥️ **Usage — Node.js (Backend)**

### **uploadImage (single)**

```js
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
```

### **Frontend usage**

```jsx
<CloudinaryUploader uploadUrl="https://your-api.com/upload" />
```

---

# 🧰 Browser Utilities

| Utility                                | Description                                       |
| -------------------------------------- | ------------------------------------------------- |
| `CompressImageBrowser(file)`           | Resize & compress image using canvas              |
| `getExifBrowser(file)`                 | Read EXIF metadata (date, rotation, camera, etc.) |
| `validateDimensions(file, minW, minH)` | Reject small images                               |
| `hashBrowser(file)`                    | Detect duplicate uploads                          |

---

# 🛠️ Node Utilities (Backend)

| Utility                            | Description                 |
| ---------------------------------- | --------------------------- |
| `uploadImage(path, opts)`          | Upload single file          |
| `uploadImages(paths, opts)`        | Upload multiple files       |
| `compressImageNode(input, output)` | Sharp compression           |
| `getExif(path)`                    | Extract metadata            |
| `hashSHA256(path)`                 | Duplicate detection         |
| `validateQuality(path)`            | Check resolution & EXIF age |

---

# ⚙️ Component & Hook Options

| Option         | Default      | Description              |
| -------------- | ------------ | ------------------------ |
| `maxWidth`     | 2000         | Resize before upload     |
| `maxHeight`    | 2000         | Resize before upload     |
| `minWidth`     | 600          | Minimum allowed          |
| `minHeight`    | 600          | Minimum allowed          |
| `maxFiles`     | 10           | Maximum per session      |
| `autoCompress` | true         | Browser compression      |
| `allowedTypes` | jpg/png/webp | Allowed formats          |
| `maxAgeDays`   | 365          | Warn if old photo (EXIF) |

---

# 🚀 Why This Package?

Cloudinary uploads can quickly get messy:
compression, validation, duplicate images, EXIF orientation, backend security…

This library solves all of that with:

✔ Strong defaults
✔ Clean API
✔ Full React + Node workflow
✔ Maximum image quality + minimal filesize
✔ No complex setup

---

# 🔐 Signed Uploads (Optional)

If you want server-signed uploads:

### Backend:

```js
// Sign upload params
```

### Frontend:

```jsx
<CloudinaryUploader
  uploadUrl="/api/signed-upload"
  signed
/>
```

---

# 📄 License

MIT — Free for commercial & personal use.

---

# 🧑‍💻 Author

Made with care by **Bonhomie**
Full-stack Web & Mobile Developer

---

# 🌟 Contribute

Pull requests are welcome.
If you love it, ⭐ star the repository on GitHub.

---

If you want, I can generate:

✅ A **GitHub repository description**
✅ A **README banner image**
✅ A **GitHub Wiki structure**
✅ A **demo playground** (CodeSandbox)

Just say the word, bro.
