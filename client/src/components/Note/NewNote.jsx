
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDispatch, useSelector} from 'react-redux';
import { createNote } from '../../Actions/NoteAction';
import {toast} from "react-toastify";


function NewNote() {

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector(state=>state.note);

    const [newNote, setNewNote] = useState({
        title: "", note_body: ""
    });

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setNewNote({...newNote, [name]:value});
    }

    const handleCreateNote = (e)=>{
        e.preventDefault();
        
        dispatch(createNote(newNote.title, newNote.note_body));
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
        }

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, error, message]);

    return (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>New Note..</h2>
                <br />
                <form onSubmit={handleCreateNote}>

                    <input type="text" name="title" value={newNote.title} onChange={handleInputs} placeholder="Write title of Note .." required />
                    <textarea name="note_body" value={newNote.note_body} onChange={handleInputs} placeholder="Write your Note.." required></textarea>
                    <br />
                    <Button disabled={loading} type="submit" variant="primary">Submit</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default NewNote;