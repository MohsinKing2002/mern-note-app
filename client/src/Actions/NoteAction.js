import axios from 'axios';

//create new note
export const createNote = (title, note_body)=>async(dispatch)=>{
    try {

        dispatch({
            type: "CreateNoteRequest"
        })

        const {data} = await axios.post(`/new`,
        {title, note_body},
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        )

        dispatch({
            type: "CreateNoteSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "CreateNoteFailure",
            payload: error.response.data.message
        })        
    }
}

//get my notes
export const getMyNotes = ()=>async(dispatch)=>{
    try {

        dispatch({
            type: "MyNotesRequest"
        })

        const {data} = await axios.get(`/me/notes`);

        dispatch({
            type: "MyNotesSuccess",
            payload: data.notes
        })
        
    } catch (error) {
        dispatch({
            type: "MyNotesFailure",
            payload: error.response.data.message
        })        
    }
}

//get followings notes
export const getFollowinNotes = ()=>async(dispatch)=>{
    try {

        dispatch({
            type: "FollowingNotesRequest"
        })

        const {data} = await axios.get(`/notes`);

        dispatch({
            type: "FollowingNotesSuccess",
            payload: data.notes
        })
        
    } catch (error) {
        dispatch({
            type: "FollowingNotesFailure",
            payload: error.response.data.message
        })        
    }
}

//like or unlike note
export const likeNote = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "LikeRequest"
        })

        const { data } = await axios.put(`/like/${id}`);

        dispatch({
            type: "LikeSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "LikeFailure",
            payload: error.response.data.message
        })
    }
}

//get liked note
export const getLikedNotes = () => async (dispatch) => {
    try {

        dispatch({
            type: "LikedNotesRequest"
        })

        const { data } = await axios.get(`/liked`);

        dispatch({
            type: "LikedNotesSuccess",
            payload: data.notes
        })

    } catch (error) {
        dispatch({
            type: "LikedNotesFailure",
            payload: error.response.data.message
        })
    }
}

//get a note with id
export const getNoteById = (id) =>async(dispatch)=>{
    try {

        dispatch({
            type: "NoteByIdRequest"
        })

        const {data} = await axios.get(`/note/${id}`);

        dispatch({
            type: "NoteByIdSuccess",
            payload: data.note
        })
        
    } catch (error) {
        dispatch({
            type: "NoteByIdFailure",
            payload: error.response.data.message
        })        
    }
}

//update note 
export const updateNote = (id, title, note_body) =>async(dispatch)=>{
    try {

        dispatch({
            type: "NoteUpdateRequest"
        })

        const {data} = await axios.put(`/update-note/${id}`, 
        {title, note_body}
        );

        dispatch({
            type: "NoteUpdateSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "NoteUpdateFailure",
            payload: error.response.data.message
        })        
    }
}

//delete note 
export const deleteNote = (id) =>async(dispatch)=>{
    try {

        dispatch({
            type: "DeleteNoteRequest"
        })

        const {data} = await axios.delete(`/delete-note/${id}`);

        dispatch({
            type: "DeleteNoteSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "DeleteNoteFailure",
            payload: error.response.data.message
        })        
    }
}