import mongoose, { Schema, model } from 'mongoose';

import { IComment } from '@/types/comment';



const commentSchema = new Schema<IComment>({
    id: {
        type: Number,
        unique: true
    },
    createdAt:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

});


export default mongoose.models.Comment ?? model<IComment>('Comment', commentSchema);

