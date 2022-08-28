
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

const Note = ({
    noteId,
    ownerId,
    ownerName,
    ownerImage,
    title,
    note_body,
    likes=[],
    comments=[]
})=>{

    return (
        <Card className="note_card">
            <Card.Body>
                <Card.Title>
                    <NavLink style={{ textDecoration: "none" }} to={`/users/${ownerId}`} className="user">
                        <img src={ownerImage} alt="avatar" />
                        <h3> {ownerName} </h3>
                    </NavLink>
                </Card.Title>
                <Card.Text>
                    <h3 style={{ color: "magenta", fontSize: "20px", marginBottom: "20px" }}>{title}</h3>
                    {note_body}
                </Card.Text>
            </Card.Body>
        </Card>  
    );
}

export default Note;