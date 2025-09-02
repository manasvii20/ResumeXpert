import mongoose from 'mongoose';
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://manasvichoudhary438:resume123@cluster0.qgjli7l.mongodb.net/RESUME')
    .then(()=>console.log('DB CONNECTED'))
}