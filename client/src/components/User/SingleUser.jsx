import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { BiNote, BiUserPin, BiHeartCircle, BiHeart, BiEnvelope } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from "../Util/Loader";
import { followUser, getSingleUser } from '../../Actions/UserAction';
import { useState } from 'react';
import Note from '../Note/Note';

function SingleUser() {

    const params = useParams();
    const [follow, SetFollow] = useState(false);

    const dispatch = useDispatch();
    const {user:me} = useSelector(state=>state.user);
    const { error: likeError, message: likeMessage } = useSelector(state => state.note);
    const {user, loading, error, message} = useSelector(state=>state.singleUser);

    const handleFollow = async()=>{
        SetFollow(!follow);
        await dispatch(followUser(params.id));
        dispatch(getSingleUser(params.id));
    }

    useEffect(()=>{
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    SetFollow(true);
                }
                else {
                    SetFollow(false);
                }
            })
        }
    }, [user, me._id]);

    useEffect(()=>{
        dispatch(getSingleUser(params.id));

        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
        }

        if(likeError){
            toast.error(likeError);
            dispatch({
                type: "clearErrors"
            })
        }

        if(likeMessage){
            toast.success(likeMessage);
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
    }, [dispatch, error, params, message, likeError, likeMessage]);

    return loading ? <Loader/> : (
        <Card className="card home_page">
            <div className="home">
                <div className="home_users">
                    <div className="user_details">
                        <span style={{ textAlign: "center" }}>
                            <img style={{ marginBottom: "20px", height: "27vh", borderRadius: "100%" }} src={user && user.avatar.url} alt="avatar" />
                            <span className="profile_user user">
                                <BiUserPin className="user_icon" />
                                <h3> {user && user.name}  </h3>
                            </span>

                            <span className="profile_user user">
                                <BiEnvelope className="user_icon" />
                                <h3> {user && user.email} </h3>
                            </span>

                            <span className="profile_user user">
                                <BiHeart className="user_icon" />
                                <h3> {user && user.followers.length} Followers </h3>
                            </span>

                            <span className="profile_user user">
                                <BiHeartCircle className="user_icon" />
                                <h3> {user && user.followings.length} Followings </h3>
                            </span>

                            <span className="profile_user user">
                                <BiNote className="user_icon" />
                                <h3> {user && user.notes.length} Notes </h3>
                            </span>

                            <Button disabled={loading} onClick={handleFollow} variant={follow ? "danger": "primary"}>{follow ? "Unfollow" : "Follow"} User</Button>
                        </span>
                    </div>
                </div>

                <div className="home_notes">

                    {
                        user && user.notes.length > 0 ? user.notes.map((item) => (
                            <Note
                                key={item._id}
                                noteId={item._id}
                                ownerId={user._id}
                                ownerName={user.name}
                                ownerImage={user.avatar.url}
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

export default SingleUser;