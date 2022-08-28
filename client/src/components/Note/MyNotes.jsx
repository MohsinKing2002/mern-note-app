import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteNote, getMyNotes } from '../../Actions/NoteAction';
import {toast} from 'react-toastify';
import Loader from "../Util/Loader";

function MyNotes() {

    const dispatch = useDispatch();
    const {notes, error:deleteError} = useSelector(state=>state.note);
    const {message, loading, error} = useSelector(state=>state.singleNote);

    const handleDelete = (e, id)=>{
        e.preventDefault();
        dispatch(deleteNote(id));
    }

    useEffect(()=>{
        dispatch(getMyNotes());

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }

        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
        }

        if(deleteError){
            toast.error(deleteError);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, error, deleteError, message]);

    return loading ? <Loader /> : (
        <Card className="card">
            <h3 className="title">My All Notes..</h3> <hr />
            <div className="home_notes" style={{width: "auto"}}>
                {
                notes && notes.length > 0 ? notes.map((item)=>(
                    <Card key={item._id} className="note_card mynote">
                        <Card.Body>
                            <Card.Title>
                                <span className="d-flex justify-content-between">
                                    <h3 style={{ color: "magenta", fontSize: "18px" }}>{item.title}</h3>
                                    <NavLink to={`/update-note/${item._id}`}>
                                        <AiOutlineEdit size={23} cursor="pointer" color="magenta" />
                                    </NavLink>
                                    
                                    <AiOutlineDelete onClick={e=>handleDelete(e, item._id)} size={23} cursor="pointer" color="magenta" />
                                </span>
                                <br />
                            </Card.Title>
                            <Card.Text>
                                {item.note_body}
                            </Card.Text>
                          
                        </Card.Body>
                    </Card>

                ))
                : "No Notes yet"
                }
            </div>
        </Card>
    );
}

export default MyNotes;