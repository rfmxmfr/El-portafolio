const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @desc    Upload a file
// @route   POST /api/uploads
// @access  Private
exports.uploadFile = (req, res) => {
  const uploadSingle = upload.single('file');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Create file URL
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      url: fileUrl,
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  });
};

// @desc    Upload multiple files
// @route   POST /api/uploads/multiple
// @access  Private
exports.uploadMultiple = (req, res) => {
  const uploadMultiple = upload.array('files', 10); // Max 10 files
  
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Create file URLs
    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    }));
    
    res.json(files);
  });
};