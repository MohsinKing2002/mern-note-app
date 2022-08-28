import { configureStore } from "@reduxjs/toolkit";
import { getNoteByIdReducer, noteReducer } from "./Reducers/NoteReducer";
import { singleUserReducer, userReducer } from "./Reducers/UserReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        note: noteReducer,
        singleUser: singleUserReducer,
        singleNote: getNoteByIdReducer
    }
})

export default store;