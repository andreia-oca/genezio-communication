import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthService } from '@genezio/auth';
import { useNavigate } from 'react-router-dom';

const MyNavbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const user = await AuthService.getInstance().userInfo();
            if (user) {
                console.log('User is logged in');
                setIsLoggedIn(true);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, []); // Run once on component mount

    const logout = async () => {
        try {
            await AuthService.getInstance().logout();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Genezio Communication NFT</Navbar.Brand>
            <Nav className="ml-auto">
                {isLoggedIn && (
                    <Button variant="danger" className="mx-2" onClick={logout}>
                        Logout
                    </Button>
                )}

                <Button variant="success" className="mx-2">
                    Generate an NFT - Coming soon!
                </Button>
            </Nav>
        </Navbar>
    );
};

export default MyNavbar;
