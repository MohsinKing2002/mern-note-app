import {createReducer} from "@reduxjs/toolkit";
const initialState = {};

//user reducer
export const userReducer = createReducer(initialState, {
    // register
    RegisterRequest: (state)=>{
        state.loading = true
    },
    RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    RegisterFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    
    // log in
    LoginRequest: (state)=>{
        state.loading = true
    },
    LoginSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },


    // load user
    LoadUserRequest: (state)=>{
        state.loading = true
    },
    LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    // update user details
    UpdateProfileRequest: (state)=>{
        state.loading = true
    },
    UpdateProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    UpdateProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // contact or support 
    ContactRequest: (state)=>{
        state.loading = true
    },
    ContactSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    ContactFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // logout user
    LogoutRequest: (state)=>{
        state.loading = true
    },
    LogoutSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },
    LogoutFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    // Delete user
    DeleteProfileRequest: (state)=>{
        state.loading = true
    },
    DeleteProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
    },
    DeleteProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    //get all users
    AllUsersRequest: (state) => {
        state.loading = true
    },
    AllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    AllUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    //clear errors and messages
    clearErrors: (state)=>{
        state.error = null
    },
    clearMessages: (state)=>{
        state.message = null
    }
})

export const singleUserReducer = createReducer(initialState, {
    // get a single user
    SingleUserRequest: (state) => {
        state.loading = true;
    },
    SingleUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    SingleUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    FollowUserRequest: (state)=>{
        state.loading = true;
    },
    FollowUserSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    FollowUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    //clear errors and messages
    clearErrors: (state) => {
        state.error = null
    },
    clearMessages: (state) => {
        state.message = null
    }
})