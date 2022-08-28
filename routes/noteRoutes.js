const express = require('express');
const { createNote, deleteNote, getMyNotes, likeAndUnlikeNote, makeComment, deleteComment, updateNote, getNotesofFollowing, getNoteById } = require('../controllers/noteController');

const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');

//new note
router.route("/new").post(isAuthenticated, createNote);

//delete note
router.route("/delete-note/:id").delete(isAuthenticated, deleteNote);

//update note
router.route("/update-note/:id").put(isAuthenticated, updateNote);

//my notes
router.route("/me/notes").get(isAuthenticated, getMyNotes);

//like or unlike note
router.route("/like/:id").put(isAuthenticated, likeAndUnlikeNote);


//make comment or update or delete comment or ( add or remove from favorite)
router.route("/comment/:id")
    .put(isAuthenticated, makeComment)
    .delete(isAuthenticated, deleteComment)


//get notes of followings
router.route("/notes").get(isAuthenticated, getNotesofFollowing);

//get favorite notes
router.route("/note/:id").get(isAuthenticated, getNoteById);


module.exports = router;