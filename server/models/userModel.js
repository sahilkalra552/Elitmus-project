import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 300
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [ true, 'Email address is required' ]
    },
    curr_level:{
        type:Number,
        default:0,
    },
    lvl1_hint_used:{
        type:Boolean,
        default:0
    },
    lvl2_hint_used:{
        type:Boolean,
        default:false
    },
    lvl3_hint_used:{
        type:Boolean,
        default:false
    },
    lvl4_hint_used:{
        type:Boolean,
        default:false
    },
    lvl5_hint_used:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model("user", userSchema);