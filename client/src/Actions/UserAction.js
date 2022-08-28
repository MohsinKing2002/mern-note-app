import axios from "axios";

//register user
export const registerUser = (name, email, password, avatar) => async(dispatch)=>{
    try {

        dispatch({
            type: "RegisterRequest"
        })

        const {data} = await axios.post(`/register`,
            {name, email,  password, avatar},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        dispatch({
            type: "RegisterSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message
        })        
    }
}


//log in user
export const loginUser = (email, password)=> async(dispatch)=>{
    try {

        dispatch({
            type: "LoginRequest"
        })

        const {data} = await axios.post(`/login`,
            {email, password},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "LoginSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message
        })
    }
}


//load user
export const loadUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "LoadUserRequest"
        })

        const {data} = await axios.get(`/profile`);

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

//logout user
export const logOutUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "LogoutRequest"
        })

        const {data} = await axios.get(`/logout`);

        dispatch({
            type: "LogoutSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "LogoutFailure",
            payload: error.response.data.message
        })
    }
}

//delete profile of user
export const deleteProfile = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "DeleteProfileRequest"
        })

        const {data} = await axios.delete(`/delete`);

        dispatch({
            type: "DeleteProfileSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "DeleteProfileFailure",
            payload: error.response.data.message
        })
    }
}

//update profile of user
export const updateProfile = (avatar, name, email)=> async(dispatch)=>{
    try {

        dispatch({
            type: "UpdateProfileRequest"
        })

        const {data} = await axios.put(`/update`,
        {avatar, name, email}
        );

        dispatch({
            type: "UpdateProfileSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "UpdateProfileFailure",
            payload: error.response.data.message
        })
    }
}

//get all users
export const getAllUsers = (name="")=> async(dispatch)=>{
    try {

        dispatch({
            type: "AllUsersSuccess"
        })

        const {data} = await axios.get(`/users?name=${name}`);

        dispatch({
            type: "AllUsersSuccess",
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: "AllUsersFailure",
            payload: error.response.data.message
        })
    }
}

//get single users
export const getSingleUser = (id)=> async(dispatch)=>{
    try {

        dispatch({
            type: "SingleUserRequest"
        })

        const {data} = await axios.get(`/users/${id}`);

        dispatch({
            type: "SingleUserSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "SingleUserFailure",
            payload: error.response.data.message
        })
    }
}

//follow user
export const followUser = (id)=> async(dispatch)=>{
    try {

        dispatch({
            type: "FollowUserRequest"
        })

        const {data} = await axios.get(`/follow/${id}`);

        dispatch({
            type: "FollowUserSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "FollowUserFailure",
            payload: error.response.data.message
        })
    }
}

//contact or support
export const contactUs = (message)=> async(dispatch)=>{
    try {

        dispatch({
            type: "ContactRequest"
        })

        const {data} = await axios.post(`/contact`,
        {message},
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        );

        dispatch({
            type: "ContactSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "ContactFailure",
            payload: error.response.data.message
        })
    }
}