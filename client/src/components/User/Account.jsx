import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { BiUserPin, BiEnvelope, BiHeart, BiHeartCircle, BiNote } from "react-icons/bi";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "../Util/Loader";
import { deleteProfile, loadUser, logOutUser } from '../../Actions/UserAction';


function Account() {
    const dispatch = useDispatch();
    const {user, error, message, loading} = useSelector(state=>state.user);
    
    const handleLogout = (e)=>{
        e.preventDefault();

        dispatch(logOutUser());
    }

    const handleDeleteProfile = (e)=>{
        e.preventDefault();
        dispatch(deleteProfile());
    }

    useEffect(()=>{
        dispatch(loadUser());

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }

        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
        }
    }, [dispatch, error, message]);

    return loading ? <Loader/> : (
        <Card className="card profile">
            <Card.Body>
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

                    </span>
                </div>
            </Card.Body>

            <Card.Body>
                <h3 className="title">Controlls..</h3>
                <br />
                <div className="user_controll">
                    <Button className="btn" variant="primary"> <NavLink className="link" to="/new">New Note</NavLink>  </Button>
                    <Button className="btn" variant="info"> <NavLink className="link" to="/mynotes">My Notes </NavLink>  </Button>
                    <Button disabled={loading} onClick={handleLogout} className="btn" variant="warning">Log out</Button>
                    <Button className="btn" variant="primary"> <NavLink className="link" to="/update">Update Profile</NavLink> </Button>
                    <Button disabled={loading} onClick={handleDeleteProfile} className="btn" variant="danger">Delete Profile</Button>
                    <Button className="btn" variant="info"> <NavLink className="link" to="/contact">Contact us</NavLink> </Button>
                </div>
            </Card.Body>

        </Card>
    );
}

export default Account;