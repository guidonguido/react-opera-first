import React from 'react';
import '../css/Header.css';
import logo from '../scritta-opera.svg';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Header = (props) => {
  return (
    <Navbar className='custom-sidebar p-0' variant='dark' expand='sm' fixed='top'>
      <Navbar.Toggle
        aria-controls='sidebar'
        aria-expanded={props.openMobileMenu}
        aria-label='Toggle sidebar'
        onClick={props.showSidebar}
      />

      <Nav className='mr-auto d-none d-sm-block custom-font flex-row'>
        <Nav.Item>
          <Nav.Link as={NavLink} to='/iscrizioneAssociazione'>
            Iscriviti ad OPERA
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Nav className='mr-auto ml-md-auto d-none d-sm-block'>
        <Nav.Link as={NavLink} exact to='/'>
          <img src={logo} className='custom-logo' alt='logo' height='10px' width='120px' />
        </Nav.Link>
      </Nav>

      <Nav className='ml-md-auto d-sm-none'>
        <Nav.Link as={NavLink} exact to='/'>
          <img src={logo} className='custom-logo-sm' alt='logo' height='10px' width='80px' />
        </Nav.Link>
      </Nav>

      <Nav className='ml-md-auto d-none d-sm-block custom-font'>
        <Nav.Link as={NavLink} to='/iscrizioneTorneo'>
          Iscriviti al TORNEO
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
