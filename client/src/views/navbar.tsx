import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthService } from '@genezio/auth';
import { useNavigate } from 'react-router-dom';

const MyNavbar: React.FC = () => {

  const [isAuth, setIsAuth] = React.useState(false);
    const navigate = useNavigate();
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
            <Button variant="danger" className="mx-2" onClick={logout}>
              Logout
            </Button>
            
            <Button variant="success" className="mx-2">
              Generate an NFT - Coming soon!
            </Button>
          </Nav>
        </Navbar>
      );
};

export default MyNavbar;
