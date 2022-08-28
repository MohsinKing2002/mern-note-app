
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { getNoteById, updateNote } from '../../Actions/NoteAction';
import Loader from '../Util/Loader';


function UpdateNote() {
    const params = useParams();

    const dispatch = useDispatch();
    const { note, loading, message, error} = useSelector(state => state.singleNote);

   const [title, setTitle] = useState();
   const [note_body, setNoteBody] = useState();

    const handleUpdate = (e)=>{
        e.preventDefault();

        dispatch(updateNote(params.id, title, note_body));
    }

    useEffect(()=>{
        dispatch(getNoteById(params.id));

        if(message){
            toast.success(message)
            dispatch({
                type: "clearMessages"
            })
        }

        if(error){
            toast.error(error)
            dispatch({
                type: "clearErrors"
            })
        }

    }, [dispatch, params.id, message, error]);

    return loading ? <Loader/> : (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Update Note..</h2>
                <br />
                <form onSubmit={handleUpdate}>

                    <input type="text" name="title" defaultValue={note && note.title} value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Write new title.."/>
                    <textarea name="note_body" defaultValue={note && note.note_body} value={note_body} onChange={(e)=>{setNoteBody(e.target.value)}} placeholder="Write new body.."></textarea>
                    <br />
                    <Button disabled={loading}  type="submit" variant="primary">Save Changes</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default UpdateNote;