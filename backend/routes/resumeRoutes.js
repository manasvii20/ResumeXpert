import express from 'express'
import { createResume, deleteResume, getResumeById, getUserResumes, updateResume, uploadResumeImages } from '../controllers/resumeController.js'
import { protect } from '../middleware/authMiddleware.js'

const resumeRouter=express.Router()
resumeRouter.post('/',protect,createResume)
resumeRouter.get('/',protect,getUserResumes)
resumeRouter.get('/:id',protect,getResumeById)

resumeRouter.put('/:id',protect,updateResume)
resumeRouter.put('/:id/upload-images',protect,uploadResumeImages)

resumeRouter.delete('/:id',protect,deleteResume)

export default resumeRouter;

