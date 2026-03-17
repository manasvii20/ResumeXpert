import express from 'express';
import multer from 'multer';
import { analyzeResumeController, rewriteBulletController } from '../controllers/aiController.js';

const aiRouter = express.Router();

// Configure multer for in-memory PDF uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// POST /api/ai/analyze-resume — full resume analysis
aiRouter.post('/analyze-resume', upload.single('resumeFile'), analyzeResumeController);

// POST /api/ai/rewrite-bullet — single bullet point rewrite
aiRouter.post('/rewrite-bullet', rewriteBulletController);

export default aiRouter;
