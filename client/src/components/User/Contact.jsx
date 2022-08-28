import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import { contactUs } from '../../Actions/UserAction';


function Contact() {

    const dispatch = useDispatch();
    const {user, loading, message:contactMessage, error} = useSelector(state=>state.user);
    const [message, setMessage] = useState();

    const handleContact = (e)=>{
        e.preventDefault();

        dispatch(contactUs(message));
    }

    useEffect(()=>{
        if(contactMessage){
            toast.success(contactMessage);
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
    }, [error, contactMessage]);

    return(
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Support / Contact..</h2>
                <br />
                <form onSubmit={handleContact}>

                    <input type="text" name="name" value={user.name} placeholder="Enter Your name.." required />
                    <input type="email" name="email" value={user.email} placeholder="Enter Your email.." required />
                    <textarea name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Write your message / suggestion.." required></textarea>
                    <br />
                    <Button disabled={loading} type="submit" variant="primary">Submit</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Contact;