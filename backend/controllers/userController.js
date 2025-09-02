import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//generate token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })  // Fixed: expireIn → expiresIn
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" })  // Correct: 400 for client error
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })  // Correct: 400 for client error
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedpassword
        })
        res.status(201).json({  // Fixed: Changed from 400 to 201 for successful creation
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//login function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })  // Fixed: Changed from 500 to 401 for unauthorized
        }
        //compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })  // Fixed: Changed from 500 to 401 for unauthorized
        }
        res.status(200).json({  // Fixed: Changed from 400 to 200 for success
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//get user profile function 
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })  // Correct: 404 for not found
        }
        res.status(200).json(user)  // Added explicit 200 status for success
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}