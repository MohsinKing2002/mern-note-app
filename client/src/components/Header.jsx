import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiSupport, BiUserPin } from 'react-icons/bi';

function Header() {

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        <img style={{ height: "5vh", borderRadius: "50px" }} src="https://www.iconbunny.com/icons/media/catalog/product/3/4/3426.6-sticky-notes-icon-iconbunny.jpg" alt="" />
                        <i style={{marginLeft: "10px"}}>Funtastic Notes</i>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={NavLink} to="/"> <AiOutlineHome className="nav_icon" size={30}/> </Nav.Link> 
                        <Nav.Link as={NavLink} to="/search"> <AiOutlineSearch className="nav_icon" size={30}/> </Nav.Link> 
                        <Nav.Link as={NavLink} to="/contact"> <BiSupport className="nav_icon" size={30}/> </Nav.Link> 
                        <Nav.Link as={NavLink} to="/account"> <BiUserPin className="nav_icon" size={30}/> </Nav.Link> 
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;