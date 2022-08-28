import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllUsers } from '../../Actions/UserAction';
import Loader from '../Util/Loader';

function Search() {
    
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const {users, loading, error} = useSelector(state=>state.user);

    const handleSearch = (e)=>{
        e.preventDefault();

        dispatch(getAllUsers(name));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, error]);

    return loading ? <Loader/> : (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Search User..</h2>
                <br />
                <form onSubmit={handleSearch}>

                    <input type="text" name="name" value={name} onChange={e=>{setName(e.target.value)}} placeholder='User Name..' required />

                    <br />
                    <Button disabled={loading} type="submit" variant="primary">Search </Button>
                </form>
                <div className="search_users users">
                    {
                        users && users.length > 0 ? users.map((user) => (
                            <NavLink style={{textDecoration: "none"}} key={user._id} to={`/users/${user._id}`} className="user">
                                <img src={user && user.avatar.url} alt="avatar" />
                                <h3> {user && user.name} </h3>
                            </NavLink>
                        )) : "No user found !!"
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

export default Search;