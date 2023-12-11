import { Navbar as NavbarBT, Container, Nav } from 'react-bootstrap';
import { FaStoreAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { adminMenu } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavbarAdmin() {
  const navigate = useNavigate();
  const locationPath = useLocation();

  const onNavigatePath = (path: string) => {
    navigate(path);
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
          <span className='me-4'>Apichet Sittipon (admin)</span>
          <FaSignOutAlt className="cursor-pointer" size="20" />
        </NavbarBT.Collapse>
      </Container>
    </NavbarBT>
  );
}