import Resume from '../models/resumeModel.js'
import fs from 'fs'
import path from 'path';
export const createResume=async(req,res)=>{
    try {
        const{title}=req.body;
        //defualt template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume=await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)
    } 
    catch (error) {
        res.status(500).json({message:"Failed to create resume",error:error.message})
    }
}

//GET FUNCTION

export const getUserResumes=async(req,res)=>{
    try {
        const resumes=await Resume.find({userId:req.user._id}).sort({
            updateAt:-1
        });
        res.json(resumes)
    } catch (error) {
        res.status(500).json({message:"Failed to get resume",error:error.message})
    }
}

//GET RESUME BY ID
export const getResumeById=async (req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id})
        if(!resume){
            return res.status(404).json({message:"Resume not found"})
        }
        res.json(resume)
    } catch (error) {
        res.status(500).json({message:"Failed to get resume",error:error.message})
    }
}

//update resumes
export const updateResume=async (req,res)=>{
    try {
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not authorised"})
        }

        //MERGE UPDATED RESUMES
        Object.assign(resume,req.body)
        //SAVE UPDATED RESUME
        const savedResume=await resume.save();
        res.json(savedResume)
    } catch (error) {
        res.status(500).json({message:"Failed to update resume",error:error.message})
    }
}

export const uploadResumeImages = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or not authorized' })
        }

        // If old image exists, delete it
        if (resume.profileInfo?.profilePreviewUrl) {
            const oldPath = path.join(
                process.cwd(),
                'uploads',
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }
        }

        // Save new file
        if (req.file) {
            resume.profileInfo.profilePreviewUrl = `/uploads/${req.file.filename}`
            await resume.save()
        }

        res.json({ message: 'Image uploaded successfully', resume })
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload image', error: error.message })
    }
}

// DELETE RESUME
export const deleteResume = async(req,res)=>{
    try {
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not authorised"})
        }
        //CREATE A UPLOADS FOLDER AND STORE THE RESUME THERE
        const uploadsFolder=path.join(process.cwd(),'uploads')

        // DELETE THUMNAIL FUNCTION
        if(resume.thumbnailLink){
            const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailLink))
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail)
            }
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile=path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail)
            }
        }

        //DELETE RESUME DOC
        const deleted=await Resume.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!deleted){
            return res.status(400).json({message:"Resume not found or not authorised"})
        }
        res.json({message:"Resume deleted sucessfully"})
    } catch (error) {
        res.status(500).json({message:"Failed to delete resume",error:error.message})
    }
}
