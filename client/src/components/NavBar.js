import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {API_ROUTE, BOOKS_ROUTE, ISSUANCE_ROUTE, READERS_ROUTE} from "../utils/consts";

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark" className="navbar">
            <Container>
                {/*<Navbar.Brand onClick={() => navigate(SCHEDULE_ROUTE)}>Расписание</Navbar.Brand>*/}
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate(BOOKS_ROUTE)}>Книжки</Nav.Link>
                    <Nav.Link onClick={() => navigate(READERS_ROUTE)}>Читачі</Nav.Link>
                    <Nav.Link onClick={() => navigate(ISSUANCE_ROUTE)}>Видача книг</Nav.Link>
                    <Nav.Link onClick={() => navigate(API_ROUTE)}>API</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;