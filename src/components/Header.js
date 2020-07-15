import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Header = (props) => {
  return (
    <Navbar bg='danger' variant='dark' expand='sm' fixed='top'>
      <Navbar.Toggle
        aria-controls='sidebar'
        aria-expanded={props.openMobileMenu}
        aria-label='Toggle sidebar'
        onClick={props.showSidebar}
      />
      

      <Nav className='mr-auto d-none d-sm-block'>
        <Nav.Link as={NavLink} to='/iscrizioneAssociazione'>
          Iscriviti ad OPERA
        </Nav.Link>
      </Nav>

      <Nav className='mr-auto ml-md-auto d-none d-sm-block'>
        <Nav.Link as={NavLink} exact to='/'>
          HOME
        </Nav.Link>
      </Nav>

      <Nav className='ml-md-auto d-sm-none'>
        <Nav.Link as={NavLink} exact to='/'>
          HOME
        </Nav.Link>
      </Nav>
      
      <Nav className='ml-md-auto d-none d-sm-block'>
        <Nav.Link as={NavLink} to='/iscrizioneTorneo'>
          Iscriviti al TORNEO
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
