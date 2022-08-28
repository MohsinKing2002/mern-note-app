const Note = require('../models/noteSchema');
const User = require("../models/userSchema");


//create a note
exports.createNote = async(req, res)=>{
    try {

        const newNote = {
            title: req.body.title,
            note_body: req.body.note_body,
            owner: req.user._id
        }

        const note = await Note.create(newNote);
        const user = await User.findById(req.user._id);

        user.notes.unshift(note._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Note is created successfully !!",
            note
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//delete a note
exports.deleteNote = async(req, res)=>{
    try {

        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found !!"})
        }

        if(note.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unathorized action !!"})
        }

        await note.remove();

        //deleting from users notes array
        const user = await User.findById(req.user._id);
        const index = user.notes.indexOf(req.params.id);
        user.notes.splice(index, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Note deleted successfully !!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//like-dislike a note
exports.likeAndUnlikeNote = async(req, res)=>{
    try {

        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({message: "Note not found !!"})
        }

        if(note.likes.includes(req.user._id)){
            let index = note.likes.indexOf(req.user._id);
            note.likes.splice(index, 1);

            await note.save();

            res.status(200).json({
                success: true,
                message: "Note unliked successfully !!"
            })
        }
        else{
            note.likes.push(req.user._id);
            await note.save();

            res.status(200).json({
                success: true,
                message: "Note liked successfully !!"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//comment on a note
exports.makeComment = async(req, res)=>{
    try {

        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({message: "Note not found !!"})
        }

        let i = -1;
        //check if comment already exists then update
        note.comments.forEach((item, index)=>{
            if(item.user.toString() === req.user._id.toString()){
                i = index;
            }
        })

        if(i != -1){
            note.comments[i].comment = req.body.comment;

            await note.save();
            res.status(200).json({
                success: true,
                message: "Comment updated successfully !!"
            })
        }  
        else{
            note.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })

            await note.save();
            res.status(200).json({
                success: true,
                message: "Comment added successfully !!"
            })
        }   

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//delete comment 
exports.deleteComment = async(req, res)=>{
    try {
        
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found !!"})
        }

        let i = -1;
        note.comments.forEach((item, index)=>{
            if(item.user.toString() == req.user._id.toString()){
                i = index;
            }
        })

        if(i != -1){
            note.comments.splice(i, 1);

            await note.save();

            res.status(200).json({
                success: true,
                message: "Comment deleted successfully !!"
            })
        }
        else{
            res.status(400).json({
                message: "No comment found!!"
            })
        }

    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}


//update a note
exports.updateNote = async(req, res)=>{
    try {

        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found !!"})
        }

        let {title, note_body} = req.body;
        if(title){
            note.title = title;
        }
        if(note_body){
            note.note_body = note_body
        }

        await note.save();
        res.status(200).json({
            success: true,
            message: "Note updated successfully !!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}


//get my notes 
exports.getMyNotes = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);
        const notes=[];

        for(let i = 0; i< user.notes.length; i++){
            const note = await Note.findById(user.notes[i]).populate("likes comments.user owner");
            notes.push(note);
        }

        res.status(200).json({
            success: true,
            notes
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

//get favorites notes
exports.getNoteById = async(req, res)=>{
    try {
        
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(400).json({message: "Note not found!!"})
        }

        res.status(200).json({
            success: true,
            note
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

//get following notes
exports.getNotesofFollowing = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);
        const notes = await Note.find({
            owner: { $in: user.followings }
        }).populate("owner likes comments.user");

        res.status(200).json({
            success: true,
            notes: notes.reverse()
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}