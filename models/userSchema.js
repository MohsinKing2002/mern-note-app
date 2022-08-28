const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name can't be empty !!"]
    },
    email: {
        type: String,
        required: [true, "email can't be empty !!"],
        unique: [true, "email already exists !!"]
    },
    password: {
        type: String,
        required: [true, "name can't be empty !!"],
        minLength: [6, "password must be greater then 6 characters !!"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    messages: [
        {
            type: String,
            required: [true, "message can't be empty !!"]
        }
    ],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ], 
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

//hash password before save user
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

//check password while login
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//provide token when user logged in
userSchema.methods.genarateToken = function(){
    return jwt.sign({_id: this._id}, process.env.SECRET_KEY);
}


module.exports = mongoose.model("User", userSchema);