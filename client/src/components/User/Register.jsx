
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../../Actions/UserAction';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {message, loading, error} = useSelector(state=>state.user);

    const [user, SetUser] = useState({
        name:"", email: "", password: ""
    });

    let [avatar, setAvatar] = useState("");
    console.log(avatar);
    const handleImageChange = (e)=>{
        let file = e.target.files[0];
        let Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }
    }
    
    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        SetUser({...user, [name]:value});
    }

    const handleRegister = (e)=>{
        e.preventDefault();

        dispatch(registerUser(user.name, user.email, user.password, avatar));
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
            
            navigate("/")
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
                <h2 className='title'>Sign up..</h2>
                <br />
                <form onSubmit={handleRegister} >
                    {avatar ? <img style={{height: "8vh"}} src={avatar} alt="avatar_preview" /> : null}
                    <input type="file" accept="image/*" onChange={handleImageChange} required/>
                    <input type="text" name="name" value={user.name} onChange={handleInputs} placeholder="Enter your name.." required />
                    <input type="email" name="email" value={user.email} onChange={handleInputs}  placeholder="Enter Your email.." required />
                    <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Enter Your password.." required />

                    <br />
                    <Button disabled={loading} type="submit" variant="primary">Register</Button>
                </form>
                <NavLink style={{ marginTop: "15px", textAlign: "center" }} className="nav-link" to="/">Already Registered? Login </NavLink>
            </Card.Body>
        </Card>
    );
}

export default Register;