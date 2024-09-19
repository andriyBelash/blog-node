import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Створюємо абсолютний шлях до директорії uploads
const uploadsDir = path.join(process.cwd(), 'uploads');

// Створюємо директорію, якщо вона не існує
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating uploads directory:', error);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadStorage = multer({ storage: storage });

export default uploadStorage;