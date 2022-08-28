
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../Actions/UserAction';


function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, loading, error } = useSelector(state => state.user);

    const [user, SetUser] = useState({
        email: "", password: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        SetUser({ ...user, [name]: value });
    }

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(loginUser(user.email, user.password));
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })

        }

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, message, error]);


    return (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Sign in..</h2>
                <br />
                <form onSubmit={handleLogin}>

                    <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder="Enter Your email.." required />
                    <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Enter Your password.." required />

                    <br />
                    <Button type="submit" disabled={loading} variant="primary">Login</Button>
                </form>
                <NavLink style={{ marginTop: "15px", textAlign: "center" }} className="nav-link" to="/register">Don't have account? </NavLink>
            </Card.Body>
        </Card>
    );
}

export default Login;