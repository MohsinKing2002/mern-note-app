import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {toast} from 'react-toastify';
import Loader from "../Util/Loader";
import { getAllUsers } from '../../Actions/UserAction';
import { getFollowinNotes } from '../../Actions/NoteAction';
import Note from '../Note/Note';

function Home() {

    const dispatch = useDispatch();
    const {notes, loading, error} = useSelector(state=>state.note);
    const { error: likeError, message: likeMessage } = useSelector(state => state.note);
    const {users, loading: userLoading, error: userError} = useSelector(state=>state.user);

    useEffect(()=>{
        dispatch(getAllUsers());
        dispatch(getFollowinNotes());

        if(userError){
            toast.error(userError);
            dispatch({
                type: "clearErrors"
            })
        }

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, userError, error]);

    useEffect(() => {
        if (likeMessage) {
            toast.success(likeMessage);
            dispatch({
                type: "clearMessages"
            })
        }

        if (likeError) {
            toast.error(likeError);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [likeError, dispatch, likeMessage]);


    return userLoading ? <Loader /> : (
        <Card className="card home_page">
            <div className="home">
                <div className="home_users">
                    <h3 className="title" style={{marginBottom: "20px"}}>Users you may know ..</h3>
                    {
                        users && users.length > 0 ? users.map((user)=>(
                            <NavLink style={{textDecoration: "none"}} to={`/users/${user._id}`} key={user._id} className="user">
                                <img src={user && user.avatar.url} alt="avatar" />
                                <h3> {user && user.name} </h3>
                            </NavLink>
                        ))
                        : "No users found"
                    }
                </div>

                <div className="home_notes">

                 {
                 notes && notes.length > 0 ? notes.map((item)=>(
                    <Note 
                    key={item._id}
                    noteId={item._id}
                    ownerId={item.owner._id}
                    ownerName={item.owner.name}
                    ownerImage={item.owner.avatar.url}
                    title={item.title}
                    note_body={item.note_body}
                    likes={item.likes}
                    comments={item.comments}
                    /> 
                 ))
                 : "No Notes Yet !!"
                }   
            
                </div>

            </div>
        </Card>
    );
}

export default Home;