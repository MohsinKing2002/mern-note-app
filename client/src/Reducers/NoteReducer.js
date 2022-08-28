import { createReducer } from "@reduxjs/toolkit";
let initialState = {};

export const noteReducer = createReducer(initialState, {
    //create new note
    CreateNoteRequest: (state)=>{
        state.loading = true;
    },
    CreateNoteSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    CreateNoteFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    //get my notes
    MyNotesRequest: (state)=>{
        state.loading = true;
    },
    MyNotesSuccess: (state, action)=>{
        state.loading = false;
        state.notes = action.payload;
    },
    MyNotesFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    //get followings notes
    FollowingNotesRequest: (state) => {
        state.loading = true
    },
    FollowingNotesSuccess: (state, action) => {
        state.loading = false;
        state.notes = action.payload;
    },
    FollowingNotesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //like notes
    LikeRequest: (state)=>{
        state.loading = true;
    },
    LikeSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    LikeFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    //clear error and messages
    clearErrors: (state)=>{
        state.error = null;
    },
    clearMessage: (state)=>{
        state.message = null;
    }
})

export const getNoteByIdReducer = createReducer(initialState, {
    //get note by id
    NoteByIdRequest: (state) => {
        state.loading = true;
    },
    NoteByIdSuccess: (state, action) => {
        state.loading = false;
        state.note = action.payload;
    },
    NoteByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //get note by id
    NoteUpdateRequest: (state) => {
        state.loading = true;
    },
    NoteUpdateSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    NoteUpdateFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //delete note
    DeleteNoteRequest: (state) => {
        state.loading = true;
    },
    DeleteNoteSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DeleteNoteFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    //clear error and messages
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
})