import { Navbar as NavbarBT, Container, Nav } from 'react-bootstrap';
import { FaStoreAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { adminMenu } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import cookie from '../utils/cookie';

export default function NavbarAdmin() {
  const navigate = useNavigate();
  const locationPath = useLocation();
  const firstName = cookie.get('firstName');
  const lastName = cookie.get('lastName');
  const role = cookie.get('role');

  const onNavigatePath = (path: string) => {
    navigate(path);
  };

  const onLogout = () => {
    cookie.remove('accessToken');
    cookie.remove('role');

    navigate('/signin');
  };

  return (
    <NavbarBT expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <NavbarBT.Brand className='mx-5'>ADMIN</NavbarBT.Brand>
        <NavbarBT.Toggle aria-controls="navbarScroll" />
        <NavbarBT.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {adminMenu.map(d => (
              <Nav.Link key={d.name} onClick={() => onNavigatePath(d.path)} className={`me-4 ${locationPath.pathname.includes(d.path) ? 'active' : ''}`}>
                {d.name === "store" ? <FaStoreAlt className="me-2" /> : <FaUserAlt className="me-2" />}{d.name}
              </Nav.Link>
            ))}
          </Nav>
          <span className='me-4'>{firstName} {lastName} {role ? `(${role})` : ''}</span>
          <FaSignOutAlt className="cursor-pointer" size="20" onClick={onLogout} />
        </NavbarBT.Collapse>
      </Container>
    </NavbarBT>
  );
}