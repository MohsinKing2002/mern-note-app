const User = require('../models/userSchema');
const Note = require('../models/noteSchema');
const cloudinary = require('cloudinary');

//register user
exports.register = async (req, res)=>{
    try {
        
        const { name, email, password, avatar } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists !!!" });
        }
        let myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "note_users"
        })

        user = await User.create({
            name, email, password, avatar:{public_id: myCloud.public_id, url: myCloud.secure_url}
        })

        res.status(201).json({
            success: true,
            message: "User Registed successfully !!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//login user
exports.login = async(req, res)=>{
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "User not found !!" })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid login credentials" })
        }

        const token = await user.genarateToken();

        let options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "User logged in successfully !!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

//get my profile
exports.myprofile = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id).populate("notes followers followings");

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//update profile
exports.updateProfile = async(req, res)=>{
    try {
        
        const {name, email, avatar} = req.body;

        const user = await User.findById(req.user._id);

        if(avatar){
            //delete the old image
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            let myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "note_users"
            })
            user.avatar.public_id = myCloud.public_id,
            user.avatar.url = myCloud.secure_url
        }

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }

        //save user
        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Profile updated successfully !!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//delete profile
exports.deleteProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        let userId = req.user._id;
        //before remove also remove [notes, likes, comments, followings and followers] ( **due)
        let notes = user.notes;
        let followers = user.followers;
        let followings = user.followings;

        //delete user avatar
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.remove();

        //delete all post of user
        for(let i = 0; i< notes.length; i++){
            const note = await Note.findById(notes[i]);
            await note.remove();
        }

        //remove user from followers's followings
        for(let i = 0; i< followers.length; i++){
            const follower = await User.findById(followers[i]);

            const index = follower.followings.indexOf(userId);
            follower.followings.splice(index, 1);
            await follower.save();
        }

        //remove user from followings's followers
        for(let i = 0; i< followings.length; i++){
            const following = await User.findById(followings[i]);

            const index = following.followers.indexOf(userId);
            following.followers.splice(index, 1);
            await following.save();
        }

        const allNotes = await Note.find();

        //delete all comments of user (** not working)
        for(let i = 0; i< allNotes.length; i++){
            const note = await Note.findById(allNotes[i]._id);
            
            for(let j = 0; j< note.comments.length; j++){
                if(note.comments[j].user.toString() === userId.toString()){
                    note.comments.splice(j, 1);
                }
            }
            await note.save();
        }
        
        //delete all likes of user (**not working)
        for(let i = 0; i < allNotes.length; i++){
            const note = await Note.findById(allNotes[i]._id);

            for (let j = 0; j < note.likes.length; j++) {
                if (note.likes[j].toString() == userId.toString()) {
                    note.likes.splice(j, 1);
                }
            }
            await note.save();
        }
        
        res.status(200).cookie("token", null, {expires: new Date(Date.now()), httpOnly: true}).json({
            success: true,
            message: "User deleted successfully !!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//logout user
exports.logout = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }

        res.status(200).cookie("token", null, options).json({
            success: true,
            message: "User logged out successfully !!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//contact or support
exports.contactus = async(req, res)=>{
    try {
        
        const user = await User.findById(req.user._id);
        const {message} = req.body;

        if(!message){
            return res.status(400).json({message: "message can't be empty !!"});
        }

        await user.messages.push(message);

        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Message sent to team !!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

//get a user details with ::-> all notes followers followings
exports.getSingleUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id).populate("notes followers followings");

        if(!user){
            return res.status(404).json({message: "User not found !!"});
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//get all users
exports.getAllUsers = async(req, res)=>{
    try {

        // search for a user also..
        const users = await User.find({
            name: { $regex: req.query.name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            users
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//follow or unfollow a user
exports.followAndUnfollow = async(req, res)=>{
    try {

        const usertoFollow = await User.findById(req.params.id);
        const userLoggedin = await User.findById(req.user._id);

        if(!usertoFollow){
            return res.status(404).json({message: "User not found !!"})
        }
        
        //if already followed then unfollow
        if(usertoFollow.followers.includes(userLoggedin._id)){
            const followIndex = usertoFollow.followers.indexOf(userLoggedin._id);
            const loggedinIndex = userLoggedin.followings.indexOf(usertoFollow._id);

            usertoFollow.followers.splice(followIndex, 1);
            userLoggedin.followings.splice(loggedinIndex, 1);

            await usertoFollow.save();
            await userLoggedin.save();

            res.status(200).json({
                success: true,
                message: "User unfollowed successfully !!"
            })
        }
        else{
            usertoFollow.followers.push(userLoggedin._id);
            userLoggedin.followings.push(usertoFollow._id);

            await usertoFollow.save();
            await userLoggedin.save();

            res.status(200).json({
                success: true,
                message: "User followed successfully !!"
            })
        }
        
    } catch (error) {
        res.status(200).json({message: error.message})        
    }
}