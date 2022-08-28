
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { updateProfile } from '../../Actions/UserAction';
import { useEffect } from 'react';
import {toast} from 'react-toastify';


function Update() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {message, error, loading} = useSelector(state=>state.user);

    const [avatar, setAvatar] = useState();
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }
    }

    const [user, setUser] = useState({
        name: "", email: ""
    });
    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleUpdate = (e)=>{
        e.preventDefault();

        dispatch(updateProfile(avatar, user.name, user.email));
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
            navigate("/account");            
        }

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, message, error, navigate]);

    return (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Edit Info..</h2>
                <br />
                <form onSubmit={handleUpdate}>
                    {avatar ? <img style={{height: "15vh", borderRadius: "100%"}} src={avatar} alt="avatar_preview" /> :null}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    <input type="text" name="name" values={user.name} onChange={handleInputs} placeholder="Enter Your name.."  />
                    <input type="email" name="email" values={user.email} onChange={handleInputs} placeholder="Enter Your email.."  />

                    <br />
                    <Button disabled={loading} type="submit" variant="primary">Save Changes</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Update;