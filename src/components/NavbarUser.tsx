import { Navbar as NavbarBT, Container, Nav } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import cookie from '../utils/cookie';

export default function NavbarUser() {
  const navigate = useNavigate();
  const firstName = cookie.get('firstName');
  const lastName = cookie.get('lastName');

  const onLogout = () => {
    cookie.remove('accessToken');
    cookie.remove('role');

    navigate('/signin');
  };

  return (
    <NavbarBT expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <NavbarBT.Brand className='mx-5'>STORE</NavbarBT.Brand>
        <NavbarBT.Toggle aria-controls="navbarScroll" />
        <NavbarBT.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <span className='me-4'>{firstName} {lastName}</span>
          <FaSignOutAlt className="cursor-pointer" size="20" onClick={onLogout} />
        </NavbarBT.Collapse>
      </Container>
    </NavbarBT>
  );
}