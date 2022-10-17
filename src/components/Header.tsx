import React from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {IUser} from "../models/IUser";
import {useAppDispatch} from "../hooks/redux";
import {userLogout} from "../store/reducers/UserSlice";
import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import Home from "../pages/Home";

const Header = ({props}: {props: IUser}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userName = props?.email
    if (!userName){
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">CryptoWave P2P</Navbar.Brand>
                        <Nav className="me-auto">
                            {/*<Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>*/}
                            {/*<Nav.Link onClick={() => navigate('/p2pscanner')}>Scanner</Nav.Link>*/}
                            {/*<Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>*/}
                        </Nav>
                    </Container>
                    <Form className="d-flex">
                        <Button variant="outline-light" className='mx-3' onClick={() => navigate('/login')}>Login</Button>
                    </Form>
                </Navbar>
            </>
        );
    } else {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">CryptoWave P2P</Navbar.Brand>
                        <Nav className="me-auto">
                            {/*<Nav.Link href="/">Home</Nav.Link>*/}
                            {/*<Nav.Link href="/p2pscanner">Scanner</Nav.Link>*/}
                            {/*<Nav.Link href="/profile">Profile</Nav.Link>*/}
                            <Link to='/' className="mx-3 text-white">Home</Link>
                            <Link to='/profile' className="mx-3 text-white">Profile</Link>
                            <Link to='/p2pscanner' className="mx-3 text-white">Scanner</Link>
                        </Nav>
                    </Container>
                    <div>{userName}</div>
                    <Form className="d-flex">
                        <Button variant="outline-light" className='mx-3' onClick={() => dispatch(userLogout())}>Logout</Button>
                    </Form>
                </Navbar>
            </>
        );
    }
};

export default Header;