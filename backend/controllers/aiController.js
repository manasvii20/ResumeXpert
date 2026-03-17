import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import { analyzeResume, rewriteBulletPoint } from '../services/aiService.js';

/**
 * POST /api/ai/analyze-resume
 * Accepts PDF file upload OR resumeText in body, plus jobDescription
 */
export const analyzeResumeController = async (req, res) => {
  try {
    let resumeText = req.body.resumeText || '';
    const jobDescription = req.body.jobDescription || '';

    // If a PDF file was uploaded, extract text from it
    if (req.file) {
      try {
        const pdfData = await pdf(req.file.buffer);
        resumeText = pdfData.text;
      } catch (pdfError) {
        console.error('PDF Parse Error:', pdfError);
        return res.status(400).json({
          success: false,
          error: 'Failed to parse PDF. Please ensure it is a valid PDF file.',
        });
      }
    }

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Resume text is required. Upload a PDF or paste your resume text.',
      });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Job description is required.',
      });
    }

    const analysis = await analyzeResume(resumeText.trim(), jobDescription.trim());

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze resume. Please try again.',
    });
  }
};

/**
 * POST /api/ai/rewrite-bullet
 * Accepts bulletPoint and optional context
 */
export const rewriteBulletController = async (req, res) => {
  try {
    const { bulletPoint, context } = req.body;

    if (!bulletPoint || !bulletPoint.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Bullet point text is required.',
      });
    }

    const result = await rewriteBulletPoint(bulletPoint.trim(), context || '');

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Bullet rewrite error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to rewrite bullet point. Please try again.',
    });
  }
};
